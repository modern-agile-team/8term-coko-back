-- CreateEnum
CREATE TYPE "PartStatus" AS ENUM ('LOCKED', 'STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "part_progress" (
    "user_id" INTEGER NOT NULL,
    "part_id" INTEGER NOT NULL,
    "status" "PartStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "part_progress_pkey" PRIMARY KEY ("user_id","part_id")
);

-- AddForeignKey
ALTER TABLE "part_progress" ADD CONSTRAINT "part_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part_progress" ADD CONSTRAINT "part_progress_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
