-- DropForeignKey
ALTER TABLE "user_items" DROP CONSTRAINT "user_items_main_category_id_fkey";

-- AlterTable
ALTER TABLE "user_items" ALTER COLUMN "main_category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user_items" ADD CONSTRAINT "user_items_main_category_id_fkey" FOREIGN KEY ("main_category_id") REFERENCES "item_main_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
