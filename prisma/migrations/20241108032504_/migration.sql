/*
  Warnings:

  - You are about to drop the column `access_token` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `token` table. All the data in the column will be lost.
  - Added the required column `social_access_token` to the `token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "token" DROP COLUMN "access_token",
DROP COLUMN "refresh_token",
ADD COLUMN     "social_access_token" TEXT NOT NULL,
ADD COLUMN     "social_refresh_token" TEXT;
