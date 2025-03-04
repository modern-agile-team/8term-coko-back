/*
  Warnings:

  - Added the required column `main_category_id` to the `user_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_items" ADD COLUMN     "main_category_id" INTEGER NOT NULL,
ADD COLUMN     "sub_category_id" INTEGER;

-- AddForeignKey
ALTER TABLE "user_items" ADD CONSTRAINT "user_items_main_category_id_fkey" FOREIGN KEY ("main_category_id") REFERENCES "item_main_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_items" ADD CONSTRAINT "user_items_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "item_sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
