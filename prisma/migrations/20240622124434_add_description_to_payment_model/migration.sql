/*
  Warnings:

  - Added the required column `description` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `payments` ADD COLUMN `description` TEXT NOT NULL;
