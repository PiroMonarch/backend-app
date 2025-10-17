


import mongoose from "mongoose";    
import { DB_NAME } from "../constants"; 
import e from "express";
 
const connectDB = async () => {
    try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MONGODB CONNECTED !! DBHOST: ${connectionInstance}`);     
    } catch (error) {
        console.log("Database connection error", error);
        process.exit(1);
    } 

}
export default connectDB;