import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";

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
app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`));