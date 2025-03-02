import { ProductI } from "@/core/models/globals";
import { db, storage } from "../lib/appwrite";
import { ID } from "appwrite";

export const createProduct = async (
    product: ProductI,
    image: File,
    userId: string
) => {
    const response = await fetch("http://localhost:3000/api/products", { 
        method: "POST", 
        headers: { "Content-Type": "application/json"}, 
        body: JSON.stringify(product) 
    });

    return response;
};

export const getProducts = async() => {
    const products = await fetch("http://localhost:3000/api/products").then((response ) => {
        return response.json();
    })
       
    return products || [];
}