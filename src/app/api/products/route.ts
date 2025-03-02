import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        connectMongoDB();
        // const db = client.db("bemark");
        // const movies = await db
        //     .collection("products")
        //     .find({})
        //     .toArray();
        
        // return NextResponse.json(movies);
    } catch (e) {
        console.error(e);
    }
}

export async function POST(req: any) {
    const productBody = await req.json();
    const client = await clientPromise;
    const db = client.db("bemark");

    let product = await db.collection("products").insertOne(productBody);
    
    return NextResponse.json(product);
}