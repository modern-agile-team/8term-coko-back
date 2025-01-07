/*
  Warnings:

  - You are about to drop the `UserHp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserHp" DROP CONSTRAINT "UserHp_user_id_fkey";

-- DropTable
DROP TABLE "UserHp";

-- CreateTable
CREATE TABLE "user_hps" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL DEFAULT 5,
    "hp_storage" INTEGER NOT NULL DEFAULT 5,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_hps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_hps_user_id_key" ON "user_hps"("user_id");

-- AddForeignKey
ALTER TABLE "user_hps" ADD CONSTRAINT "user_hps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
