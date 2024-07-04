/*
  Warnings:

  - Made the column `eventId` on table `event_forms` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `event_forms` DROP FOREIGN KEY `event_forms_eventId_fkey`;

-- AlterTable
ALTER TABLE `event_forms` MODIFY `eventId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `event_forms` ADD CONSTRAINT `event_forms_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
