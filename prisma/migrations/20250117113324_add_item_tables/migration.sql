/*
  Warnings:

  - You are about to drop the column `category_id` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `items` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `created_at` on the `user_items` table. All the data in the column will be lost.
  - You are about to drop the `item_categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `main_category_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_category_id_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "category_id",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "main_category_id" INTEGER NOT NULL,
ADD COLUMN     "sub_category_id" INTEGER,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "user_items" DROP COLUMN "created_at",
ADD COLUMN     "purchased_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "item_categories";

-- CreateTable
CREATE TABLE "item_main_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "item_main_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_sub_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "main_category_id" INTEGER NOT NULL,

    CONSTRAINT "item_sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_main_categories_name_key" ON "item_main_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "item_sub_categories_name_key" ON "item_sub_categories"("name");

-- AddForeignKey
ALTER TABLE "item_sub_categories" ADD CONSTRAINT "item_sub_categories_main_category_id_fkey" FOREIGN KEY ("main_category_id") REFERENCES "item_main_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_main_category_id_fkey" FOREIGN KEY ("main_category_id") REFERENCES "item_main_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "item_sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
