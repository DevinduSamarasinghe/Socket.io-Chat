import User from '../models/userModel.js';
import Chat from '../models/chatModel.js';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../config/generateToken.js';
import bcrypt from 'bcryptjs';

export const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserID param not sent with request")
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,

        //We need to find both users
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ],
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    });

    if (isChat.length == 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try{
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password");
            res.status(200).json(FullChat);
        }catch(error){
            res.status(400)
            throw new Error(error.message);
        }
    }
})

