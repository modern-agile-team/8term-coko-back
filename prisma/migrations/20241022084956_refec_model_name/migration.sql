/*
  Warnings:

  - You are about to drop the column `part` on the `quizzes` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `quizzes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'NORMAL', 'HARD', 'VERY_HARD');

-- AlterTable
ALTER TABLE "quizzes" DROP COLUMN "part",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- DropEnum
DROP TYPE "Part";
