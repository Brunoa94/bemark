"use client";
import { ProductI } from "@/core/models/globals";
import { addProduct } from "@/lib/features/cartSlice";
import { useAppStore } from "@/lib/hooks";
import React from "react";
import { useDispatch } from "react-redux";

const ProductCard = (props: ProductI) => {
  const dispatch = useDispatch();

  function addProductToCart() {
    const product: ProductI = {
      name: props.name,
      price: props.price,
      id: props.id,
      img: props.img,
      categories: props.categories,
    };

    dispatch(addProduct(product));
  }

  return (
    <div className="card w-full md:w-full bg-base-100 shadow-xl">
      <figure className="relative">
        <img src={props.img} alt="productimage" />
        {props.badge && (
          <div className="badge badge-secondary absolute top-3 left-3 uppercase font-bold p-2">
            {props.badge}
          </div>
        )}
      </figure>
      <div className="card-body grow-1 md:flex md:flex-col md:justify-end">
        <h2 className="card-title">{props.name}</h2>
        {props.description && (
          <p className="text-base line-clamp-3">{props.description}</p>
        )}
        {props.categories && props.categories?.length > 0 && (
          <div className="card-actions justify-start">
            {props.categories.map((category) => (
              <div className="badge badge-outline">{category}</div>
            ))}
          </div>
        )}
      </div>
      <button
        className="btn btn-outline btn-primary"
        onClick={() => {
          addProductToCart();
        }}
      >
        Buy it for {props.price}
      </button>
    </div>
  );
};

export default ProductCard;
