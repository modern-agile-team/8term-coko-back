/*
  Warnings:

  - Added the required column `challenge_type` to the `challenges` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChallengeType" AS ENUM ('SECTION_CLEAR', 'LEVEL_CLEAR', 'ALL_SECTIONS_CLEAR', 'ATTENDANCE_STREAK', 'RANKING_CHALLENGE', 'FIRST_ITEM_PURCHASE', 'FIRST_WRONG_ANSWER', 'FIRST_404_VISIT');

-- AlterTable
ALTER TABLE "challenges" ADD COLUMN     "challenge_type" "ChallengeType" NOT NULL;
