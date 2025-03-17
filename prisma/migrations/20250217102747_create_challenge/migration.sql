-- CreateTable
CREATE TABLE "challenges" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 0,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "condition" INTEGER NOT NULL DEFAULT 0,
    "badge_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "challenges_badge_name_key" ON "challenges"("badge_name");
