/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `StoreOwner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `StoreOwner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StoreOwner" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StoreOwner_email_key" ON "StoreOwner"("email");
