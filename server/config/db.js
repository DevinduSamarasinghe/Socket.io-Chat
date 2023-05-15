import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        mongoose.set("strictQuery",false);
        mongoose.connect(process.env.MONGODBURL);
        const connection = mongoose.connection;

        connection.once("open",()=>console.log("MongoDB Database connected Successfully"));
    }catch(error){
        console.log(error)
    }
}