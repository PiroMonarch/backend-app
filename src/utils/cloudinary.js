import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";





    
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,


        api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
        api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
    });
    


const uploadOnCloudinary = async (localFilePath) => { // Fixed: Added 'const' keyword
    try {  
        if(!localFilePath) return null
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload
        (localFilePath,{

            response_type: "auto"
        }

        )
        // file has been uploaded successsfully
        //ole.log("file has been uploaded on cloudinary",
          //response.url);
          fs.unlinkSync(localFilePath) //remove the locally saved temporary file
            return response;

            
        
    } catch (error) {
        fs.unlinkSync(localFilePath) // Fixed: Removed unwanted line break - remove the locally saved temporary file as the upload operation failed
        return null;
        
    }
}
   

export { uploadOnCloudinary } // Fixed: Added space for readability



    