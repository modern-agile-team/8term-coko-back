/*
  Warnings:

  - You are about to drop the column `partId` on the `quizzes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `sections` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `part` to the `quizzes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "part" AS ENUM ('Easy', 'Normal', 'Hard', 'VeryHard');

-- AlterTable
ALTER TABLE "quizzes" DROP COLUMN "partId",
ADD COLUMN     "part" "part" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sections_name_key" ON "sections"("name");
