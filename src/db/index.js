


import mongoose from "mongoose";    
import { DB_NAME } from "../constants.js";

 
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
     //adding  an additonal  check  for  connectionInstance cause trouble in development !
     if(!connectionInstance ||connectionInstance===undefined){
      console.log(`the env  variable  are not accessible properly !! please check to the .env file  as  connectionInstance is  ${connectionInstance} `)
     }
        console.log(`\n MONGODB CONNECTED !! DB HOST: ${connectionInstance.connection.host}`);     
    } catch (error) {
        console.log("MONGODB connection FAILED:", error);
        process.exit(1);
    } 
}
export default connectDB;
