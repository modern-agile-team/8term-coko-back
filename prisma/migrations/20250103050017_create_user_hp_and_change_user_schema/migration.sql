/*
  Warnings:

  - You are about to drop the column `last_login` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `max_health_point` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "last_login",
DROP COLUMN "max_health_point",
DROP COLUMN "profile_image";

-- CreateTable
CREATE TABLE "UserHp" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL DEFAULT 5,
    "hp_storage" INTEGER NOT NULL DEFAULT 5,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserHp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserHp_user_id_key" ON "UserHp"("user_id");
