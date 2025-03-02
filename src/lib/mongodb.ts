import mongoose from "mongoose";

export const connectMongoDB = () => {
  try{
    mongoose.connect(process.env.MONGODB_URI || "");
    console.log("Connected to MongoDB");
  }catch (error){
    console.log(error);
  }
}