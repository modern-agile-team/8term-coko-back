/*
  Warnings:

  - You are about to drop the column `answerChoice` on the `quizzes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `quizzes` table. All the data in the column will be lost.
  - You are about to drop the column `sectionId` on the `quizzes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `quizzes` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `quizzes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `question` on the `quizzes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to drop the column `createdAt` on the `sections` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `sections` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `sections` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `section_id` to the `quizzes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `quizzes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `sections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "quizzes" DROP CONSTRAINT "quizzes_sectionId_fkey";

-- AlterTable
ALTER TABLE "quizzes" DROP COLUMN "answerChoice",
DROP COLUMN "createdAt",
DROP COLUMN "sectionId",
DROP COLUMN "updatedAt",
ADD COLUMN     "answer_choice" TEXT[],
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "section_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "question" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "sections" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
