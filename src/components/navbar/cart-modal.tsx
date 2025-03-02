"use client";
import { ProductI } from "@/core/models/globals";
import { useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";

interface Props {
  products: ProductI[];
}

const CartModal = (props: Props) => {
  const [selected, setSelected] = useState<string[]>([]);
  const { products } = props;

  function handleSelected(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    if (event.target.checked) {
      setSelected([...selected, id]);
    } else {
      setSelected([...selected.filter((item) => item !== id)]);
    }
  }

  useEffect(() => {
    console.log("SELECTED: " + selected);
  }, [selected]);

  return (
    <div className="overflow-x-scroll bg-white p-4 rounded-xl z-30">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={(e) => {
                    e.target.checked
                      ? setSelected([...products.map((product) => product.id)])
                      : setSelected([]);
                  }}
                />
              </label>
            </th>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: ProductI) => (
            <tr key={`product-card-${product.id}`}>
              <th>
                <label>
                  <input
                    onChange={(e) => handleSelected(e, product.id)}
                    type="checkbox"
                    className="checkbox"
                    checked={selected.includes(product.id)}
                  />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={product.img} alt="Product Image" />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div className="font-bold">{product.name}</div>
                  {product.categories && product.categories?.length > 0 && (
                    <div className="flex items-center gap-2">
                      {product.categories.map((category: string) => (
                        <span className="text-sm text-gray-500">
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td>{product.price}</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <button className="btn btn-outline btn-success">
                Confirm Order
              </button>
            </th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartModal;
