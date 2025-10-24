import { asyncHandler } from "../utils/asynchandler.js";
import{APIError} from "../utils/appError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



const registerUser = asyncHandler( async(req,res) => {
              //user get details from frontend
              //validation - not empty
              //check for images check for avatar
              // upload them to cloudinary,avatar
              // create user object - create entry in db
              //remove password and refresh token field from response
              // check for user creation
              // return res



              const {fullName,email,username,password } = req.body
                console.log("email:",email);

                if (
                     [ fullName,email,username,password].some((field) => 
                    field?.trim() === "")) 
                 {throw new APIError("all fields are required",400)}        

                 const existedUser = User.findOne({
                    $or: [{email},{username}]
                 })

                 if(existedUser){
                    throw new APIError("user with email or username already exists",400)
                 }

                 const avatarLocalPath =req.files?.avatar[0]?.path;
                 coverImageLocalPath =req.files?.coverimage[0]?.path;

                 if(!avatarLocalPath){
                    throw new APIError(400,"avatar is required")
                 }
    

} )

export {   registerUser,
 }
                 
                       
                        

                                          




















