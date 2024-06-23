/*
  Warnings:

  - Added the required column `label` to the `event_forms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event_forms` ADD COLUMN `label` VARCHAR(191) NOT NULL;
