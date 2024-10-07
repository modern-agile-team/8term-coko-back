/*
  Warnings:

  - You are about to drop the column `last_login` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `max_health_point` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "last_login",
DROP COLUMN "max_health_point",
DROP COLUMN "profile_image",
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "maxHealthPoint" INTEGER,
ADD COLUMN     "profileImage" TEXT;
