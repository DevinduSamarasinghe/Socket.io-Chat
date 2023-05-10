import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

import asyncHandler from "express-async-handler";

export const sendMessage = async(req,res)=>{
    const {content, chatId} = req.body;

    if(!content || !chatId){
        return res.sendStatus(400).send("Invalid data passed into request");
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try{
        var message = await Message.create(newMessage);
        
        message = await message.populate("sender","name pic")
        message = await message.populate("chat")
        message = await User.populate(message, {path: "chat.users", select: "name pic email"});
        message = await Message.populate(message, {path: "chat.latestMessage", select: "content"})

        //Updating the latest message of the chat by the newly created message now
        await Chat.findByIdAndUpdate(req.body.chatId, {latestMessage: message});
        res.json(message);



    }catch(error){
        res.status(400);
        throw new Error("Error at Catch: " + error.message );
    }
}

export const allMessages = async(req,res)=>{
    try{
        const messages = await Message.find({chat: req.params.chatId}).populate("sender","name pic email")
        res.json(messages);
    }catch(error){
        res.sendStatus(400);
        throw new Error("Error at Catch: " + error.message );
    }
}