/*
  Warnings:

  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "point" SET DEFAULT 3000;
