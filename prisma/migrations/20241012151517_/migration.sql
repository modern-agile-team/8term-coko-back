/*
  Warnings:

  - You are about to alter the column `nickname` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "nickname" SET DATA TYPE VARCHAR(50);
