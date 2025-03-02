import { getProducts } from "@/backend/products";
import ProductCard from "@/components/home/product-card";
import { ProductI } from "@/core/models/globals";
import React from "react";

async function fetchProducts() {
  const products = await getProducts();
  console.log("PRODUCTS: " + JSON.stringify(products));
  return products;
}

const Homepage = async () => {
  const products = await fetchProducts();

  return (
    <div className="w-full px-4 pb-8 md:mx-auto h-screen overflow-y-scroll">
      <span className="text-3xl font-roboto font-bold">Main Market</span>
      <div className="mt-4 grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: ProductI, index: number) => (
          <ProductCard
            img={product.img}
            name={"Product Name"}
            description={product.description}
            categories={product.categories}
            price={product.price}
            badge="new"
            id={product.$id}
            key={`product-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
