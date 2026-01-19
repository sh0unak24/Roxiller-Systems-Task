import express from 'express'
import { userRouter } from './user';
import { systemAdministrator } from './systemAdministrator';
import { storeOwnerRouter } from './storeOwner';
import { storeRouter } from './store';

export const rootRouter = express.Router();

rootRouter.get("/" , (req , res) => {
    res.json({
        message : "inside root router"
    })
})
rootRouter.use("/user" , userRouter)
rootRouter.use("/storeOwner" , storeOwnerRouter)
rootRouter.use("/systemAdministrator" , systemAdministrator)
rootRouter.use("/store" , storeRouter)
