/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `parts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order]` on the table `sections` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `parts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `sections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parts" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sections" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "parts_order_key" ON "parts"("order");

-- CreateIndex
CREATE UNIQUE INDEX "sections_order_key" ON "sections"("order");
