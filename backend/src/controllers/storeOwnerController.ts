import prisma from "../config/prisma";
import bcrypt from  'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request , Response } from "express";

interface OwnerSignUpBody {
    email: string;
    name: string;
    password: string;
  }
  
  export const ownerSignup = async (req: Request, res: Response) => {
    try {
      const { email, name, password } = req.body as OwnerSignUpBody;
  
      if (!email || !name || !password) {
        return res.status(400).json({
          message: "Please provide all required fields",
        });
      }
  
      const existingOwner = await prisma.storeOwner.findUnique({
        where: { email },
      });
  
      if (existingOwner) {
        return res.status(409).json({
          message: "Owner already exists",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const owner = await prisma.storeOwner.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
  
      const token = jwt.sign(
        { id: owner.id, role: "OWNER" },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );
  
      return res.status(201).json({
        message: "Owner registered successfully",
        token,
        owner: {
          id: owner.id,
          name: owner.name,
          email: owner.email,
        },
      });
    } catch (err) {
      console.error("Owner signup error:", err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  interface OwnerLoginBody {
    email: string;
    password: string;
  }
  
  export const ownerLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body as OwnerLoginBody;
  
      if (!email || !password) {
        return res.status(400).json({
          message: "Please provide all required fields",
        });
      }
  
      const owner = await prisma.storeOwner.findUnique({
        where: { email },
      });
  
      if (!owner) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
  
      const isValidPassword = await bcrypt.compare(password, owner.password);
  
      if (!isValidPassword) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
  
      const token = jwt.sign(
        { id: owner.id, role: "OWNER" },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );
  
      return res.status(200).json({
        message: "Login successful",
        token,
        owner: {
          id: owner.id,
          email: owner.email,
          name: owner.name,
        },
      });
    } catch (err) {
      console.error("Owner login error:", err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };