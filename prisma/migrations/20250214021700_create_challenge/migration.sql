-- CreateTable
CREATE TABLE "challenges" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "point" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "condition" INTEGER NOT NULL,
    "badge_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);
