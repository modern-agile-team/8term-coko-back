-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_main_category_id_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_sub_category_id_fkey";

-- DropForeignKey
ALTER TABLE "user_items" DROP CONSTRAINT "user_items_main_category_id_fkey";

-- DropForeignKey
ALTER TABLE "user_items" DROP CONSTRAINT "user_items_sub_category_id_fkey";

-- CreateIndex
CREATE INDEX "items_main_category_id_idx" ON "items"("main_category_id");

-- CreateIndex
CREATE INDEX "items_sub_category_id_idx" ON "items"("sub_category_id");

-- CreateIndex
CREATE INDEX "user_items_main_category_id_idx" ON "user_items"("main_category_id");

-- CreateIndex
CREATE INDEX "user_items_sub_category_id_idx" ON "user_items"("sub_category_id");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_main_category_id_fkey" FOREIGN KEY ("main_category_id") REFERENCES "item_main_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "item_sub_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_items" ADD CONSTRAINT "user_items_main_category_id_fkey" FOREIGN KEY ("main_category_id") REFERENCES "item_main_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_items" ADD CONSTRAINT "user_items_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "item_sub_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
