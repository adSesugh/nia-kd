-- DropForeignKey
ALTER TABLE `event_payments` DROP FOREIGN KEY `event_payments_eventId_fkey`;

-- AlterTable
ALTER TABLE `event_payments` MODIFY `eventId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `event_payments` ADD CONSTRAINT `event_payments_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
