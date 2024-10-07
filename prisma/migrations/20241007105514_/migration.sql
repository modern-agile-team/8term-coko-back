/*
  Warnings:

  - Made the column `level` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `point` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastLogin` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxHealthPoint` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "level" SET NOT NULL,
ALTER COLUMN "level" SET DEFAULT 1,
ALTER COLUMN "point" SET NOT NULL,
ALTER COLUMN "point" SET DEFAULT 0,
ALTER COLUMN "lastLogin" SET NOT NULL,
ALTER COLUMN "lastLogin" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "maxHealthPoint" SET NOT NULL,
ALTER COLUMN "maxHealthPoint" SET DEFAULT 5;
