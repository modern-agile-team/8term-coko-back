/*
  Warnings:

  - Changed the type of `category` on the `quizzes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `part` on the `quizzes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Part" AS ENUM ('EASY', 'NORMAL', 'HARD', 'VERY_HARD');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('COMBINATION', 'MULTIPLE_CHOICE', 'OX_SELECTOR', 'SHORT_ANSWER');

-- AlterTable
ALTER TABLE "quizzes" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL,
DROP COLUMN "part",
ADD COLUMN     "part" "Part" NOT NULL;

-- DropEnum
DROP TYPE "part";
