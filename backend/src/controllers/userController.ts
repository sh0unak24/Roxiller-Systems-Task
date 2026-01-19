import prisma from "../config/prisma";
import bcrypt from  'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request , Response } from "express";

interface userBody  { 
    email : string,
    name : string,
    address : string,
    password : string
}
export const userSignup = ( async (req : Request , res : Response) => {
    try {
        const {email , name , address , password} : userBody= req.body;
        if(!email || !name || !address || !password){
           return res.status(400).json({
                message : "Please send all the fields"
            })
        }

        const existingUser = await prisma.normalUser.findUnique({
            where: { email }
        });

        if(existingUser){
            return res.status(400).json({
                message : "User with given email already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        const user = await prisma.normalUser.create({
            data : {
                email , 
                name , 
                address , 
                password : hashedPassword
            }
        })

        const token = jwt.sign(
            {id : user.id , role : "USER"},
            process.env.JWT_SECRET as string,
            {expiresIn : "7d"}
        )

        res.status(201).json({
            message : "User registered",
            token : token,
            user : {
                id : user.id,
                name : user.name,
                email : user.email,
                address : user.address
            }
        })

    } 
    catch(err){
        console.error(err);
        console.log("Error signing up user")
        return res.status(500).json({
            message : "Interna server error"
        })
    }
})

interface userLogInBody {
    email : string,
    password : string
}
export const userLogin = ( async (req : Request , res : Response) => {
    try {
        const {email , password} : userLogInBody= req.body;

        if(!email || !password){
            return res.status(400).json({
                message : "please provide all the fields"
            })
        }

        
        const existingUser = await prisma.normalUser.findUnique({
            where : {
                email : email
            }
        })

        if(!existingUser){
            return res.status(401).json({
                message : "Invalid email , please sign up"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    
        if(!isPasswordCorrect){
            return res.status(400).json({
                message : "Invalid email or password , please try again"
            })
        }

        const token = jwt.sign(
            {id : existingUser.id , role : "USER"},
            process.env.JWT_SECRET as string,
            {expiresIn : "7d"}
        )

        return res.status(200).json({
            message : "Login successfull",
            token : token,
            user : {
                id : existingUser.id,
                email : existingUser.email,
                name : existingUser.name,
                address : existingUser.address
            }
        })

    } catch(err){
        console.error(err)
        console.log("Error while log in ")
        return res.status(500).json({
            message : "Internal server error"
        })
    }
})

export const getUsers = async (req : Request , res : Response) => {
    try {
        const users = await prisma.normalUser.findMany({
            select : {
                id : true,
                name : true,
                email : true,
                address : true,
                ratings : true
            }
        })
        if(!users){
            return res.status(400).json({
                message : "error fetching users"
            })
        }

        return res.status(200).json({
            message : "users fetched successfully",
            users : users
        })
    }
     catch(err){
        console.error(err)
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}