import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { accessChat,fetchChats } from "../controller/chatController.js";

const router = express.Router();

router.post('/',protect,accessChat)
router.get('/',protect,fetchChats)
// router.post('/group',protect,createGroupChat)
// router.put('/renameGroup',protect,renameGroup)
// router.put('/groupRemove',protect,removeMember)
// router.put('/groupAdd',protect,addMember)

export default router; 