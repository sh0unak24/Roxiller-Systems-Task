import express from 'express'
import { userLogin, userSignup } from '../controllers/userController';
import { authenticate } from '../middleware/auth.Middleware';
import { allowRoles } from '../middleware/roleAuth.Middleware';
import { Request , Response } from 'express';
import { getStoresForUser } from '../controllers/storeController';
import { rateStore } from '../controllers/ratingController';
import { updatePassword } from '../controllers/authController';
export const userRouter = express.Router();

userRouter.get("/" , (req , res) => {
    res.json({
        message : "inside userRouter "
    })
})

userRouter.post("/signup" , userSignup);
userRouter.post("/login" , userLogin);
userRouter.get("/" , authenticate , allowRoles(["USER"]))
userRouter.get("/stores", authenticate, allowRoles(["USER"]), getStoresForUser);
userRouter.post( "/stores/:storeId/rating", authenticate, allowRoles(["USER"]), rateStore );
userRouter.post("/update/password" , authenticate , allowRoles(["USER" , "OWNER"]) , updatePassword)