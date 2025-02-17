/*
  Warnings:

  - A unique constraint covering the columns `[user_id,challenge_id]` on the table `user_challenges` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "user_challenges_challenge_id_idx" ON "user_challenges"("challenge_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_challenges_user_id_challenge_id_key" ON "user_challenges"("user_id", "challenge_id");
