import { getUserProducts } from "@/backend/users";
import { Header } from "@/components/global/fonts";
import { ProductI } from "@/core/models/globals";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

interface Props {
  products: ProductI[];
}

async function fetchProducts(id: string) {
  const products = await getUserProducts(id);

  return products;
}

const ProfileProducts = async ({ params }: { params: { id: string } }) => {
  let products: ProductI[] = [];
  products = await fetchProducts(params.id);

  return (
    <div className="w-full flex flex-col items-center h-screen">
      <div className="w-full lg:w-5/6 py-4 px-8">
        <h1 className={`${Header} mb-4`}>Your Products</h1>
        <div className="flex gap-4 flex-wrap">
          {products &&
            products.length > 0 &&
            products.map((product: ProductI) => (
              <div
                key={`profile-produtct-${product.name}`}
                className="card w-80 h-96 bg-base-100 shadow-xl image-full shrink-0"
              >
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Details</button>
                  </div>
                </div>
              </div>
            ))}
          <Link href="/create">
            <div className="w-80 h-96 rounded-lg flex flex-col items-center justify-center shadow-xl hover:shadow-2xl">
              <button className="btn btn-circle">
                <IoMdAdd className="text-black h-8 w-8" />
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileProducts;
