-- CreateTable
CREATE TABLE "daily_quests" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "point" INTEGER NOT NULL,
    "exp" INTEGER NOT NULL,
    "condition" INTEGER NOT NULL,

    CONSTRAINT "daily_quests_pkey" PRIMARY KEY ("id")
);
