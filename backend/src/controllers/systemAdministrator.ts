import prisma from "../config/prisma";
import bcrypt from  'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request , Response } from "express";

interface adminSignupBody {
    email: string;
    name: string;
    password: string;
  }
  
  export const adminSignup = async (req: Request, res: Response) => {
    try {
      const { email, name, password } = req.body as adminSignupBody;
  
      if (!email || !name || !password) {
        return res.status(400).json({
          message: "Please provide all required fields",
        });
      }
  
      const existingAdmin = await prisma.systemAdministrator.findUnique({
        where: { email },
      });
  
      if (existingAdmin) {
        return res.status(409).json({
          message: "Owner already exists",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const admin = await prisma.systemAdministrator.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
  
      const token = jwt.sign(
        { id: admin.id, role: "ADMIN" },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );
  
      return res.status(201).json({
        message: "Admin registered successfully",
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      });
    } catch (err) {
      console.error("admin signup error:", err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  interface adminLoginBody {
    email: string;
    password: string;
  }
  
  export const adminLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body as adminLoginBody;
  
      if (!email || !password) {
        return res.status(400).json({
          message: "Please provide all required fields",
        });
      }
  
      const admin = await prisma.systemAdministrator.findUnique({
        where: { email },
      });
  
      if (!admin) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
  
      const isValidPassword = await bcrypt.compare(password, admin.password);
  
      if (!isValidPassword) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
  
      const token = jwt.sign(
        { id: admin.id, role: "ADMIN" },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );
  
      return res.status(200).json({
        message: "Login successful",
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        },
      });
    } catch (err) {
      console.error("Admin login error:", err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };


export const getAdmins = async (req : Request , res : Response) => {
  try{
    const admins = await prisma.systemAdministrator.findMany({
      select : {
        id : true,
        name : true,
        email : true
      }
    })

    if(!admins){
      return res.status(400).json({
        message : "error fetching admins"
      })
    }

    return res.status(200).json({
      message : "Admins fetched successfully",
      admins
    })
  }
  catch(err){
    console.error("Admin login error:", err);
      return res.status(500).json({
        message: "Internal server error",
      });
  }
}

export const getSystemAdminDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const [
      totalUsers,
      totalStoreOwners,
      totalStores,
      totalAdmins,
    ] = await Promise.all([
      prisma.normalUser.count(),
      prisma.storeOwner.count(),
      prisma.store.count(),
      prisma.systemAdministrator.count(),
    ]);

    return res.status(200).json({
      message: "System admin dashboard data fetched successfully",
      data: {
        totalUsers,
        totalStoreOwners,
        totalStores,
        totalAdmins,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

interface userBody  { 
  email : string,
  name : string,
  address : string,
  password : string
}
export const addUser = ( async (req : Request , res : Response) => {
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

      return res.status(201).json({
          message : "User registered",
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
      console.log("Error adding user")
      return res.status(500).json({
          message : "Interna server error"
      })
  }
})