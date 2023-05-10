import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"


//This middleware is used to identify if a token is present in the header

export const protect = asyncHandler(async(req, res, next) => {
    
    let token;  //This is the token that is sent in the header

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){    //if the token is present and it starts with the bearer means it has the specific token
        console.log("Authorization Header: ",req.headers.authorization);


        try{
            token = req.headers.authorization.split(" ")[1]; //We are using the second index

            //decode the token ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.object._id).select("-password");    //we are going to get the user object without the password for safer validation
            next();

            
        }catch(error){
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if(!token){
        res.status(401);
        throw new Error("Not authorized, No Token");
    }
})