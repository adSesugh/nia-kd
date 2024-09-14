-- DropForeignKey
ALTER TABLE `event_plan_prices` DROP FOREIGN KEY `event_plan_prices_eventId_fkey`;

-- AlterTable
ALTER TABLE `event_plan_prices` MODIFY `eventId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `event_plan_prices` ADD CONSTRAINT `event_plan_prices_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
