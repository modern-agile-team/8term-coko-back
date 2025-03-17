/*
  Warnings:

  - A unique constraint covering the columns `[challenge_type,condition]` on the table `challenges` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "challenges_challenge_type_condition_key" ON "challenges"("challenge_type", "condition");
