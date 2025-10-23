import mongoose,{schema} from mongoose
import jwt from "jsonwebtoken"  
import bcrypt from "bcrypt"

const userschema = new schema({
              
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
             fullname: {
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
            ,WatchHistory:[  {
                type : Schema.Types.ObjectId,
                ref : "Video"
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
userschema.pre("save", async function (next ) {
    if(!this.isModified("password")) return next();
      this.password = bcrypt.hash(this.password,10)
    next()
})

userschema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}

userschema.methods.generateAccessToken = function (){
  return jwt.sign(
         { _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
   




            },
            process.env,ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACESS_TOKEN_EXPIRY
            }




  )



}
    
userschema.methods.generateRfreshTokenToken = function (){
  return jwt.sign(
         { _id: this._id,
            
   




            },
            process.env,REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }




  )

 

}
    










export const User =mongoose.model("User",userschema)


