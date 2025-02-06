-- CreateTable
CREATE TABLE "user_daily_quests" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "daily_quest_id" INTEGER NOT NULL,
    "condition_progress" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_daily_quests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_daily_quests_daily_quest_id_idx" ON "user_daily_quests"("daily_quest_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_daily_quests_user_id_daily_quest_id_key" ON "user_daily_quests"("user_id", "daily_quest_id");

-- AddForeignKey
ALTER TABLE "user_daily_quests" ADD CONSTRAINT "user_daily_quests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_daily_quests" ADD CONSTRAINT "user_daily_quests_daily_quest_id_fkey" FOREIGN KEY ("daily_quest_id") REFERENCES "daily_quests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
