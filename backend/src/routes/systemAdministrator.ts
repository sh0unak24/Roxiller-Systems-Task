import express from 'express'
import { addUser, adminLogin, adminSignup, getAdmins, getSystemAdminDashboard } from '../controllers/systemAdministrator';
import { authenticate } from '../middleware/auth.Middleware';
import { allowRoles } from '../middleware/roleAuth.Middleware';
import { Response , Request } from 'express';
import { addStore, getStores } from '../controllers/storeController';
import { getUsers } from '../controllers/userController';

export const systemAdministrator = express.Router();

systemAdministrator.get("/" , (req , res) => {
    res.json({
        message : "inside systemAdministrator "
    })
})

systemAdministrator.post("/signup" , adminSignup)
systemAdministrator.post("/login" , adminLogin)

systemAdministrator.post("/add/store" , authenticate , allowRoles(["ADMIN"]) , addStore)
systemAdministrator.get("/users" , authenticate , allowRoles(["ADMIN"]) , getUsers)
systemAdministrator.get("/stores" , authenticate , allowRoles(["ADMIN"]) , getStores)
systemAdministrator.get("/admins" , authenticate , allowRoles(["ADMIN"]) , getAdmins)
systemAdministrator.get("/dashboard" , authenticate , allowRoles(["ADMIN"]) , getSystemAdminDashboard)
systemAdministrator.post("/addUser" , authenticate , allowRoles(["ADMIN"]) , addUser)