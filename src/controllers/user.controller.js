import { asyncHandler } from "../utils/asynchandler.js";
import { APIError } from "../utils/APIError.js"; // Fixed: Correct import path for APIError
import { ApiResponse } from "../utils/ApiResponse.js";
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
               //onsole.log("email:",email);

                if (
                     [ fullName,email,username,password].some((field) => 
                    field?.trim() === "")) 
                 {throw new APIError(400, "all fields are required")}        

                 const existedUser = await User.findOne({
                    $or: [{email},{username}]
                 })

                 if(existedUser){
                    throw new APIError(400, "user with email or username already exists")
                 }

                 const avatarLocalPath =req.files?.avatar[0]?.path;
                //overImageLocalPath =req.files?.coverimage[0]?.path;
                let coverImageLocalPath;
                if(req.files && Array.isArray(req.files.coverimage) && req.files.coverimage.length > 0){    
                    coverImageLocalPath = req.files?.coverimage[0]?.path;
                } 






                 if(!avatarLocalPath){
                    throw new APIError(400,"avatar is required")
                 }
                 const avatar = await uploadOnCloudinary(avatarLocalPath);
                 const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    
               const user = await User.create({
                    fullName,
                    email, 
                     username: username.toLowerCase(), // Fixed: toLowercase() should be toLowerCase()
                                          avatar: avatar.url,
                     coverImage: coverImage?.url,
                     password
                })

                const createdUser = await User.findById(user._id).select(
                    "-password -refreshtoken "
                )

                  if(!createdUser){ 
                     throw new APIError(500,"user creation failed")
                  }

                  res.status(201).json(new ApiResponse(
                    201,
                    createdUser,
                    "user created successfully"
                  ))

} )

export {   registerUser,
 }
                 
                       
                        

                                          




















