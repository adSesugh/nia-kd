/*
  Warnings:

  - You are about to drop the column `amount` on the `event_registrations` table. All the data in the column will be lost.
  - You are about to drop the column `paymentRef` on the `event_registrations` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `event_registrations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventRegistrationId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `event_registrations_paymentRef_key` ON `event_registrations`;

-- AlterTable
ALTER TABLE `event_registrations` DROP COLUMN `amount`,
    DROP COLUMN `paymentRef`,
    DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `payments` ADD COLUMN `eventRegistrationId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `payments_eventRegistrationId_key` ON `payments`(`eventRegistrationId`);

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_eventRegistrationId_fkey` FOREIGN KEY (`eventRegistrationId`) REFERENCES `event_registrations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
