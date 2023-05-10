import jwt from 'jsonwebtoken';
import dotenv from 'dotenv/config';

export const generateToken = (object)=>{
    return jwt.sign({object},process.env.JWT_SECRET,{
        expiresIn: '2h'
    })
}