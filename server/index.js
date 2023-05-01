import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";

import { chats } from "./data/dummy.js";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/user',userRouter)

//PORT Configurations 
const PORT = process.env.PORT || 8070;

//Assigning the routes



//Setting up mongoose
connectDB();
//Setting up the server backend
app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`));