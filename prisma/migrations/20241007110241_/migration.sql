/*
  Warnings:

  - Made the column `experience` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "experience" SET NOT NULL,
ALTER COLUMN "experience" SET DEFAULT 0;
