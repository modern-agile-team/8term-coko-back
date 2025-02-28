/*
  Warnings:

  - The values [RANKING_CHALLENGE] on the enum `ChallengeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChallengeType_new" AS ENUM ('SECTION_CLEAR', 'LEVEL_CLEAR', 'ALL_SECTIONS_CLEAR', 'ATTENDANCE_STREAK', 'RANKING_ATTAIN', 'FIRST_ITEM_PURCHASE', 'FIRST_WRONG_ANSWER', 'FIRST_404_VISIT');
ALTER TABLE "challenges" ALTER COLUMN "challenge_type" TYPE "ChallengeType_new" USING ("challenge_type"::text::"ChallengeType_new");
ALTER TYPE "ChallengeType" RENAME TO "ChallengeType_old";
ALTER TYPE "ChallengeType_new" RENAME TO "ChallengeType";
DROP TYPE "ChallengeType_old";
COMMIT;
