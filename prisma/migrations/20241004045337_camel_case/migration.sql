/*
  Warnings:

  - You are about to drop the column `part_id` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `section_id` on the `questions` table. All the data in the column will be lost.
  - Added the required column `partId` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionId` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" DROP COLUMN "part_id",
DROP COLUMN "section_id",
ADD COLUMN     "partId" INTEGER NOT NULL,
ADD COLUMN     "sectionId" INTEGER NOT NULL;
