import { Request, Response } from "express";
import prisma from "../config/prisma";


export const addStore = async (req : Request , res : Response) => {
  try {
    const {storeName , storeAddress , ownerId} = req.body;
    if(!storeAddress || !storeName || !ownerId){
      return res.status(400).json({
        message : "please send all the fields"
      })
    }

    const existingStore = await prisma.store.findUnique({
      where : {
        ownerId
      }
    })
    if(existingStore){
      return res.status(400).json({
        message : "Store already exists"
      })
    }

    const store = await prisma.store.create({
      data : {
        storeAddress,
        storeName,
        ownerId
      }
    })

    return res.status(201).json({
      message : "New store created successfully",
      store : store,
    })
  } 
  catch(err){
    console.error(err);
    return res.status(500).json({
      message : "Internal Server Error"
    })
  }
}

export const getStoresForUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const stores = await prisma.store.findMany({
      include: {
        ratings: {
          select: {
            value: true,
            userId: true,
          },
        },
      },
    });

    const result = stores.map((store) => {
      const ratings = store.ratings;

      const averageRating =
        ratings.length === 0
          ? null
          : ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length;

      const myRating =
        ratings.find((r) => r.userId === userId)?.value ?? null;

      return {
        id: store.id,
        storeName: store.storeName,
        storeAddress: store.storeAddress,
        averageRating,
        myRating,
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Get stores error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getStores = async (req: Request, res: Response) => {
  try {
    const stores = await prisma.store.findMany({
      select: {
        id: true,
        storeName: true,
        storeAddress: true,
        owner: true,
        ratings: {
          select: {
            value: true
          }
        }
      }
    });

    const storesWithAvgRating = stores.map((store) => {
      const totalRatings = store.ratings.length;

      const avgRating =
        totalRatings === 0
          ? 0
          : store.ratings.reduce((sum, r) => sum + r.value, 0) / totalRatings;

      return {
        ...store,
        avgRating
      };
    });

    return res.status(200).json({
      message: "Stores fetched successfully",
      stores: storesWithAvgRating
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

export const getStoreByOwner = async (req : Request , res : Response) => {

  try {
    const ownerId = (req as any).user.id
    if(!ownerId){
      return res.status(403).json({
        message : "Please login"
      })
    }

    const store = await prisma.store.findUnique({
      where : {ownerId}
    })
    if(!store){
      return res.status(400).json({ 
        message : "User does not own a store"
      })
    }

    return res.status(200).json({
      message : "Store fetched successfully",
      store
    })
  }
  catch(err){
    console.error(err)
    return res.status(500).json({
        message : "Internal Server Error"
    })
}
}