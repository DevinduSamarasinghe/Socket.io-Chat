import express from "express";
import cors from "cors";
import { authUser, registerUser, allUsers } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get('/',protect,allUsers)
router.post('/signup',registerUser)
router.post('/login',authUser)


export default router;