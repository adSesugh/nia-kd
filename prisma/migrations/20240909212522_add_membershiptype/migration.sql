/*
  Warnings:

  - Added the required column `membershipTypeId` to the `event_plan_prices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event_plan_prices` ADD COLUMN `membershipTypeId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `event_plan_prices` ADD CONSTRAINT `event_plan_prices_membershipTypeId_fkey` FOREIGN KEY (`membershipTypeId`) REFERENCES `MembershipType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
