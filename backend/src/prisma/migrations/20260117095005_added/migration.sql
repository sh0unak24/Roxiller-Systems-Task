/*
  Warnings:

  - Added the required column `password` to the `StoreOwner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StoreOwner" ADD COLUMN     "password" TEXT NOT NULL;
