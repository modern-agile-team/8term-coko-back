/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `token` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "provider_id" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "token_user_id_key" ON "token"("user_id");
