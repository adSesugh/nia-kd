/*
  Warnings:

  - You are about to drop the column `paymentMode` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `paymentMode`,
    ADD COLUMN `paymentType` VARCHAR(191) NOT NULL DEFAULT 'Free';
