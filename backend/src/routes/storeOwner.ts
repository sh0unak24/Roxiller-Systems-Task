import express from 'express'
import { ownerLogin, ownerSignup } from '../controllers/storeOwnerController';
import { authenticate } from '../middleware/auth.Middleware';
import { allowRoles } from '../middleware/roleAuth.Middleware';
import { Response , Request} from 'express';
import { getStoreByOwner } from '../controllers/storeController';
import { updatePassword } from '../controllers/authController';
import { getStoreRatingsForOwner } from '../controllers/ratingController';

export const storeOwnerRouter = express.Router();

storeOwnerRouter.get("/" , (req , res) => {
    res.json({
        message : "inside storeOwnerRouter "
    })
})

storeOwnerRouter.use("/signup" , ownerSignup)
storeOwnerRouter.use("/login" , ownerLogin)
storeOwnerRouter.get("/users" , authenticate , allowRoles(["OWNER"]) , ((req : Request ,res : Response) => {
    res.json({
        message : "owner authenticated and authorized "
    })
}))
storeOwnerRouter.get("/store" , authenticate , allowRoles(["OWNER"]) , getStoreByOwner)
storeOwnerRouter.post("/update/password" , authenticate , updatePassword)
storeOwnerRouter.get("/ratings" , authenticate , allowRoles(["OWNER"]) , getStoreRatingsForOwner)