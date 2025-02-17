/*
  Warnings:

  - You are about to alter the column `badge_name` on the `challenges` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[badge_name]` on the table `challenges` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "challenges" ALTER COLUMN "badge_name" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "challenges_badge_name_key" ON "challenges"("badge_name");
