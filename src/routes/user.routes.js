import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";   

const router = Router()

// Test route
router.get('/test', (req, res) => {
    console.log('Test route hit');
    res.json({ message: 'User routes working' });
});

router.route("/register").post(
    upload.fields([
        {name: "avatar", maxCount: 1},
        {name: "coverimage", maxCount: 1}
    ]),
    (req, res, next) => {
        console.log('Register route hit, files:', req.files);
        console.log('Body:', req.body);
        next();
    },
    registerUser)

export default router
