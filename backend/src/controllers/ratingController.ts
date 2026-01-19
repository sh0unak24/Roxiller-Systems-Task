import { Request, Response } from "express";
import prisma from "../config/prisma";

export const rateStore = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const storeId = Number(req.params.storeId);
    const { value } = req.body;


    if (!value || value < 1 || value > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const rating = await prisma.rating.upsert({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
      update: {
        value,
      },
      create: {
        userId,
        storeId,
        value,
      },
    });

    return res.status(200).json({
      message: "Rating submitted successfully",
      rating,
    });
  } 
  catch (error) {
    console.error("Rate store error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getStoreRatingsForOwner = async (
  req: Request,
  res: Response
) => {
  try {
    const ownerId = (req as any).user.id;

    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const store = await prisma.store.findUnique({
      where: { ownerId },
      include: {
        ratings: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const totalRatings = store.ratings.length;

    const averageRating =
      totalRatings === 0
        ? 0
        : store.ratings.reduce((sum, r) => sum + r.value, 0) / totalRatings;

    return res.status(200).json({
      store: {
        id: store.id,
        storeName: store.storeName,
        storeAddress: store.storeAddress
      },
      averageRating: Number(averageRating.toFixed(2)),
      totalRatings,
      ratings: store.ratings
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};