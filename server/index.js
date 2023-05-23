import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import {Server} from "socket.io";
import {createServer} from "http";


import { chats } from "./data/dummy.js";
import { connectDB } from "./config/db.js";

//importing the routes
import userRouter from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



//PORT Configurations 
const PORT = process.env.PORT || 8070;


//Assigning the routes

app.use('/api/user',userRouter)
app.use('/api/chats',chatRoutes)
app.use('/api/message',messageRoutes);


//Setting up mongoose
connectDB();
//Setting up the server backend
const server = app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`));

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
    }
});

io.on("connection",(socket)=>{
    console.log("Connected to Socket.io");

    socket.on('setup',(userData)=>{
        console.log("User Data: ",userData);
        socket.join(userData._id);  //has created a room for the user
        socket.emit('connected');
    });

    socket.on('join chat', (room)=>{
        socket.join(room);     //We get the chat to this Room
        console.log("User joined the room: ",room);
    });

    socket.on('new message',(newMessageReceived)=>{
        var chat = newMessageReceived.chat;
        console.log("Chat is : ", newMessageReceived.chat);

        if(!chat.users) return console.log('chat.users not defined');

        chat.users.forEach((user=>{
            if(user._id === newMessageReceived.sender._id) return;
            console.log(user._id);
            socket.in(user._id).emit("Message received", newMessageReceived);
            console.log("Message sent to: ",user._id);
        }));
    });

 });



