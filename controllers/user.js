import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


//generating hash password
const generateHashPassword = async (password) => {
    const SALT_ROUNDS = 10;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashPass = await bcrypt.hash(password, salt);
    return hashPass;
}


//checking whether user exists
const checkUserExists = async (username) => {
  const result = await User.findOne({username: username});
  return result;
}

//for sign up
export const signUp = async (req, res) => {
const username = req.body.username;
const password = req.body.password;

const checkUser = await checkUserExists(username);

if(checkUser){
    res.status(400).send({msg: 'User already exists, please log in.'})
} else {
    const hashedPassword = await generateHashPassword(password);
    const result = await User.create({
        username: username,
        password: hashedPassword
    })
    res.status(200).send({msg: "Account created, please log in with same credentials", result: result});
}

}



export const login = async (req, res) => {
  
    try {
        const username = req.body.username;
        const password = req.body.password;
    
        const checkUser = await checkUserExists(username);

        if(!checkUser){
            res.status(400).send({msg: "Invalid Credentials"})
         } else {
             const storedHashPassword = checkUser.password;
             
             const isPasswordCorrect = await bcrypt.compare(password, storedHashPassword);
     
             if(isPasswordCorrect){
                 const token = await jwt.sign({id: checkUser._id}, process.env.JWT_SECRET_KEY);
     
                 res.status(200).send({msg: "Login Success, please use the provided token as a request header of  'auth-token', because the other routes require that header.", token: token})
             } else {
                res.status(200).send({msg: "Invalid Credentials"})
             }
         }
    } catch (error) {
        res.status(400).send({msg: error.message})
    }



}