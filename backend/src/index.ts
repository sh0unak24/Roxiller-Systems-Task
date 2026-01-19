import express from 'express'
import cors from 'cors';
import dotenv from "dotenv";
import prisma from './config/prisma';
import { rootRouter } from './routes/route';

dotenv.config();
const app = express()
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1" , rootRouter)
app.get("/" , async ( req , res) => {
    res.json({
        message : "server started"
    })
})

async function startServer() {
    try {
      await prisma.$connect();
      console.log("Database connected");
  
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (err) {
      console.error("DB connection failed", err);
      process.exit(1);
    }
  }
  
  startServer();