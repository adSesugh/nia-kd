/*
  Warnings:

  - You are about to drop the `event_payments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paymentType` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event_payments` DROP FOREIGN KEY `event_payments_eventId_fkey`;

-- AlterTable
ALTER TABLE `events` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `payments` ADD COLUMN `eventId` VARCHAR(191) NULL,
    ADD COLUMN `paymentType` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `event_payments`;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
