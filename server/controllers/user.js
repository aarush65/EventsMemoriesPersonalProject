import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import dotenv from 'dotenv';
dotenv.config();


export const signIn = async(req,res) => {
    const {email,password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) {
          return res.status(404).json({message:'User does not exist'});
        }
        const isPasswordCorrect = await bcrypt.compareSync(password, existingUser.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({message: 'Invalid password'});
        }
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.secret, {expiresIn: '1h'});
        res.status(200).json({result:existingUser, token});
    } catch (error) {
        res.status(500).json('An error occurred');
    }
};
export const signUp = async(req,res)=> {
    const {email, password, firstName, lastName, confirmPassword} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: 'User already exists!'});
        if(password !== confirmPassword) return res.status(400).json({message:'Passwords do not match!'});
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const result = await User.create({email, password: hashPassword,name:`${firstName} ${lastName}`});       
        const token = jwt.sign({email: result.email, id: result._id}, process.env.secret, {expiresIn: '1h'});
        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json('An error occurred');
    }
}