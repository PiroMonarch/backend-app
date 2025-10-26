import mongoose, { Schema } from "mongoose" // Fixed: Correct import syntax and capital 'Schema'
import jwt from "jsonwebtoken"  
import bcrypt from "bcrypt"

const userSchema = new Schema({ // Fixed: Capital 'S' in Schema
              
             username: { 
             type: String,
             required:true,
             lowercase: true,
             trim: true,
             index: true
             },
             email:{
                type: String,
             required:true,
             lowercase: true,
             trim: true,
             },
             fullName: {
                type: String,
             required:true,
             index:true,
             trim: true
             },
             avatar: {
                type: String,   //cloudinary url
                required:true
            }
            ,coverImage: {
                type: String,  //cloudinary url
            }
            , WatchHistory: [{
                type: Schema.Types.ObjectId, // Fixed: Schema is now imported
                ref: "Video"
            }

            
            ],
            password:{
                type: String,
                required : [true,"password is required "]
            },
            refreshtoken:{
                type:String
            }, 
              
            timestamps: true
})

// Hash password before saving to database
userSchema.pre("save", async function (next) { // Fixed: Capital 'S' in userSchema
    if(!this.isModified("password")) return next();
      this.password = await bcrypt.hash(this.password,10)
    next()
})

// Method to check if password is correct
userSchema.methods.isPasswordCorrect = async function (password) { // Fixed: Capital 'S' in userSchema
    return await bcrypt.compare(password, this.password)
}

// Method to generate access token
userSchema.methods.generateAccessToken = function () { // Fixed: Capital 'S' in userSchema
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName // Fixed: Capital 'N' in fullName
        },
        process.env.ACCESS_TOKEN_SECRET, // Fixed: Changed comma to dot
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Fixed: Changed ACESS to ACCESS
        }
    )
}

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () { // Fixed: Capital 'S' in userSchema and removed typo 'RfreshTokenToken'
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET, // Fixed: Changed comma to dot
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema) // Fixed: Capital 'S' in userSchema and added space

