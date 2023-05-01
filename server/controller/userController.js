import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../config/generateToken.js';
import bcrypt from 'bcryptjs';

export const registerUser = asyncHandler(async(req, res) => {

    try{

        //Gets all the information
        const {name, email, password, pic} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"Please enter all the fields"})
        }

        //Checks if the user already exists
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});   //This works
        }

        //Creates the user
        user = new User({name, email, password, pic});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
        }
        //Checks if the user is created
        if(user){
            res.status(201).json({user: user, token: generateToken(payload)});
        }else{
            res.status(400).json({message:"Failed to Create the User"});
        }
    }catch(error){
        res.status(400).json({message:"Reached the Catch Statement"});
    }
})

export const authUser = async(req, res) => {

    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
        }

        if(user){
            res.status(201).json({user: user, token: generateToken(payload)});
        }else{
            res.status(400).json({message:"User not found"});
        }
    }catch(error){
        res.status(500).json({message:"Server Error - Reached Catch Statement"})
    }

}