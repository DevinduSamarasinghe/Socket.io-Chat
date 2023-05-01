import express from "express";
import cors from "cors";
import { authUser, registerUser } from "../controller/userController.js";


const router = express.Router();

router.post('/signup',registerUser);
router.post('/login',authUser)

export default router;