-- AddForeignKey
ALTER TABLE "UserHp" ADD CONSTRAINT "UserHp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
