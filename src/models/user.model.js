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

userschema.methiods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}
    




export const User =mongoose.model("User",userschema)


