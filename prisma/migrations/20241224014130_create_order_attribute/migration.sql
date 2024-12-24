/*
  Warnings:

  - Added the required column `order` to the `parts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `sections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parts" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sections" ADD COLUMN     "order" INTEGER NOT NULL;
