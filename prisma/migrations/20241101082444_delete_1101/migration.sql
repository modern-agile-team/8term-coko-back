-- CreateEnum
CREATE TYPE "Part" AS ENUM ('EASY', 'NORMAL', 'HARD', 'VERY_HARD');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('COMBINATION', 'MULTIPLE_CHOICE', 'OX_SELECTOR', 'SHORT_ANSWER');

-- CreateTable
CREATE TABLE "quizzes" (
    "id" SERIAL NOT NULL,
    "part" "Part" NOT NULL,
    "section_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "question" VARCHAR(1000) NOT NULL,
    "answer" TEXT[],
    "answer_choice" TEXT[],
    "category" "Category" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sections" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "nickname" VARCHAR(50) NOT NULL,
    "profile_image" TEXT,
    "max_health_point" INTEGER NOT NULL DEFAULT 5,
    "last_login" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" INTEGER NOT NULL DEFAULT 1,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "experience_for_next_level" INTEGER NOT NULL DEFAULT 50,
    "point" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserItems" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isEquipped" BOOLEAN NOT NULL DEFAULT false,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sections_name_key" ON "sections"("name");

-- CreateIndex
CREATE INDEX "UserItems_userId_idx" ON "UserItems"("userId");

-- CreateIndex
CREATE INDEX "UserItems_itemId_idx" ON "UserItems"("itemId");

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItems" ADD CONSTRAINT "UserItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItems" ADD CONSTRAINT "UserItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
