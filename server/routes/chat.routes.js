import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { accessChat,fetchChats } from "../controller/chatController.js";

const router = express.Router();

router.post('/',protect,accessChat)
router.get('/',protect,fetchChats)


export default router; 