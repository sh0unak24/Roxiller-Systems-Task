import express from 'express'
import { authenticate } from '../middleware/auth.Middleware'
import { getStores } from '../controllers/storeController'

export const storeRouter = express.Router()

storeRouter.get("/" , authenticate , getStores)