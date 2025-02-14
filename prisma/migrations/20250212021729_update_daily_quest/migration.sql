/*
  Warnings:

  - You are about to drop the column `exp` on the `daily_quests` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `daily_quests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "daily_quests" DROP COLUMN "exp",
DROP COLUMN "title",
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "point" SET DEFAULT 0,
ALTER COLUMN "condition" SET DEFAULT 0;
