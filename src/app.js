import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';


const app = express();





app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended:true , limit:"16kb"}))

app.use(express.static("public"))


app.use(cookieParser())

//import routes

import userRouter from './routes/user.routes.js'

// routes declaration

app.use("/api/v1/users", userRouter)

// Global error handler middleware - catches all errors
// app.use((err, req, res, next) => {
//     // If error is APIError, use its statusCode and message
//     if (err instanceof Error) {
//         if (err.statusCode) {
//             // Custom APIError                                                                    do  not  add  these  code as  you  already  counter your apierror.js  file ,these could  create conflict  in codebase 

//             return res.status(err.statusCode || 500).json({
//                 success: false,
//                 message: err.message || "Something went wrong",
//                 errors: err.errors || [],
//                 data: null
//             });
//         }
//     }
    
//     // Default error response
//     res.status(err.statusCode || 500).json({
//         success: false,
//         message: err.message || "Internal Server Error",
//         errors: [],
//         data: null
//     });
// });

export { app }
