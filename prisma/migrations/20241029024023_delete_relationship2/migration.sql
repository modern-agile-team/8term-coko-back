/*
  Warnings:

  - You are about to drop the column `part_id` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `section_id` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `section_id` on the `quizzes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "quizzes" DROP CONSTRAINT "quizzes_section_id_fkey";

-- AlterTable
ALTER TABLE "progress" DROP COLUMN "part_id",
DROP COLUMN "section_id";

-- AlterTable
ALTER TABLE "quizzes" DROP COLUMN "section_id";

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
