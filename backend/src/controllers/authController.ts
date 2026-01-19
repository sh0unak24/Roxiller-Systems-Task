
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";

export const updatePassword = async (req: Request, res: Response) => {
    try {
      const { id: userId, role } = (req as any).user;
      const { oldPassword, newPassword } = req.body;
  
      if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "All fields required" });
      }
      console.log("userid and role" + userId + role)
      let user;
  
      if (role === "OWNER") {
        user = await prisma.storeOwner.findUnique({ where: { id: userId } });
      } else {
        user = await prisma.normalUser.findUnique({ where: { id: userId } });
      }
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect current password" });
      }
  
      const hashed = await bcrypt.hash(newPassword, 10);
  
      if (role === "OWNER") {
        await prisma.storeOwner.update({
          where: { id: userId },
          data: { password: hashed },
        });
      } else {
        await prisma.normalUser.update({
          where: { id: userId },
          data: { password: hashed },
        });
      }
  
      return res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };