import { ProductI } from "@/core/models/globals";
import { db, storage } from "../lib/appwrite";
import { ID } from "appwrite";
import {  UserDatabaseI } from "@/core/models/user";

export const createUser = async (
    user: UserDatabaseI,
    image: File
) => {
    try {
        const response = await storage.createFile(
            process.env.NEXT_PUBLIC_USERS_BUCKET_ID!,
            ID.unique(),
            image
        );
        
        const file_url = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${response.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}&mode=admin`;

        await db.createDocument(
            process.env.NEXT_PUBLIC_DB_ID!,
            process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
            response.$id, 
            {...user, icon: file_url}
        );

        alert("User created successfully");
    } catch (err) {
        console.error(err);
    }
};

export const getUser = async (
    email: string
) => {
    try {
       const users: UserDatabaseI[] = await db.listDocuments(
        process.env.NEXT_PUBLIC_DB_ID!,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!
       ).then(
        (response:any) => {
            return response["documents"]
        }
       )

       const user = users.filter((user: UserDatabaseI) => {
        return user.email === email
       })[0]

       return user || [];
    
    } catch (err) {
        console.error(err);
    }
};

export const login = async(name: string, password: string) => {
    const authUser = await getUser(name);

    if(!authUser){
        return undefined;
    }

    if(authUser.password === password){
        return {
            email: authUser.email,
            id: authUser.$id,
            icon: authUser.icon
        }
    }else{
        return undefined
    }
}

export const getUserProducts = async(id: string) => {
    const productsDB: ProductI[] = await db.listDocuments(
        process.env.NEXT_PUBLIC_DB_ID!,
        process.env.NEXT_PUBLIC_PRODUCTS_COLLECTION_ID!
       ).then(
        (response:any) => {
            return response["documents"]
        }
       )

    const products = productsDB.filter((product: ProductI) => {
        return product.users?.$id === id
    })

    return products || [];
}