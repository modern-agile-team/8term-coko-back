/*
  Warnings:

  - The primary key for the `progress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `questions_id` on the `progress` table. All the data in the column will be lost.
  - Added the required column `quiz_id` to the `progress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "progress" DROP CONSTRAINT "progress_questions_id_fkey";

-- AlterTable
ALTER TABLE "progress" DROP CONSTRAINT "progress_pkey",
DROP COLUMN "questions_id",
ADD COLUMN     "quiz_id" INTEGER NOT NULL,
ADD CONSTRAINT "progress_pkey" PRIMARY KEY ("user_id", "quiz_id");

-- AddForeignKey
ALTER TABLE "progress" ADD CONSTRAINT "progress_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
