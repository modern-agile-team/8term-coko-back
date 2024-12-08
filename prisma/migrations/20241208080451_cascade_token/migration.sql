-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_user_id_fkey";

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
