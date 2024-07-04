-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_duesId_fkey`;

-- DropIndex
DROP INDEX `payments_paymentRef_key` ON `payments`;

-- AlterTable
ALTER TABLE `event_registrations` MODIFY `checkin_date` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `payments` MODIFY `duesId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_duesId_fkey` FOREIGN KEY (`duesId`) REFERENCES `dues`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
