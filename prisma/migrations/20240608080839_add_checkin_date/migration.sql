/*
  Warnings:

  - Added the required column `checkin_date` to the `event_registrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpdp_points` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event_registrations` ADD COLUMN `checkin_date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `certificate` VARCHAR(191) NULL,
    ADD COLUMN `cpdp_points` INTEGER NOT NULL,
    ADD COLUMN `hasCertificate` BOOLEAN NOT NULL DEFAULT false;
