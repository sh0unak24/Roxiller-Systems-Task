/*
  Warnings:

  - Added the required column `password` to the `SystemAdministrator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SystemAdministrator" ADD COLUMN     "password" TEXT NOT NULL;
