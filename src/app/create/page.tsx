"use client";
import React, { useEffect, useState } from "react";
import { createProduct } from "../../backend/products";
import { FontLabelNormal, Header } from "@/components/global/fonts";
import { ProductI } from "@/core/models/globals";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateProduct = () => {
  const [file, setFile] = useState<any>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const [product, setProduct] = useState<ProductI>({
    name: "",
    img: "",
    price: 0,
  });

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  async function addProduct() {
    console.log("PRODUCT: " + JSON.stringify(product));
    await createProduct(product, file, session?.user?.id || "").then(() => {
      //router.push(`/products/profile/${session?.user?.id}`);
    });
  }

  const inputLabelCreate = (title: string, id: string, required?: boolean) => {
    const updateValue = (event: any) => {
      setProduct((prevProduct: ProductI) => ({
        ...prevProduct,
        [id]: event.target.value,
      }));
    };

    return (
      <div className="flex flex-col w-full">
        <span className={`${FontLabelNormal}`}></span>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">{title}</span>
            {required && (
              <span className="label-text-alt text-red-700">* Required</span>
            )}
          </div>
        </label>
        {id === "description" ? (
          <textarea
            className="textarea textarea-primary textarea-bordered h-24"
            placeholder="Description"
            onChange={(e) => updateValue(e)}
          ></textarea>
        ) : id === "price" ? (
          <input
            onChange={(e) => updateValue(e)}
            type="number"
            step="0.01"
            placeholder={title}
            className="input input-primary input-bordered w-full"
          />
        ) : id == "img" ? (
          <input
            type="file"
            className="file-input file-input-primary w-full max-w-xs"
            onChange={handleFileChange}
          />
        ) : (
          <input
            onChange={(e) => updateValue(e)}
            type="text"
            placeholder={title}
            className="input input-primary input-bordered w-full"
          />
        )}
      </div>
    );
  };

  const handleMultipleChange = (event: any) => {
    const options = event.target.options;
    const selectedOptions: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setProduct((prevProduct: ProductI) => ({
      ...prevProduct,
      categories: selectedOptions,
    }));
  };

  // useEffect(() => {
  //   console.log("Product: " + JSON.stringify(product));
  // }, [product]);

  return (
    <div className="w-full h-screen flex flex-col px-4 lg:items-center">
      <div className="flex flex-col w-full gap-3 lg:w-4/6">
        <h1 className={`${Header}`}>Insert Product</h1>
        {inputLabelCreate("Title", "name")}
        {inputLabelCreate("Description", "description")}
        {inputLabelCreate("Badge", "badge")}
        {inputLabelCreate("Product Image", "img")}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-end lg:gap-4">
          {inputLabelCreate("Price", "price")}
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
            </label>
            <select
              className="select select-primary w-full"
              value={product.categories}
              onChange={handleMultipleChange}
            >
              <option disabled selected>
                Select Category
              </option>
              <option>Shoes</option>
              <option>Clothes</option>
              <option>Watches</option>
              <option>Jewelry</option>
              <option>Underwear</option>
            </select>
          </div>
        </div>
        <button
          className="btn-primary btn btn-outline mt-4"
          onClick={() => addProduct()}
        >
          Add Products
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
