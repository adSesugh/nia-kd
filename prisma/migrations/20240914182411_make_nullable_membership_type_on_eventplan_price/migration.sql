-- DropForeignKey
ALTER TABLE `event_plan_prices` DROP FOREIGN KEY `event_plan_prices_membershipTypeId_fkey`;

-- AlterTable
ALTER TABLE `event_plan_prices` MODIFY `membershipTypeId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `event_plan_prices` ADD CONSTRAINT `event_plan_prices_membershipTypeId_fkey` FOREIGN KEY (`membershipTypeId`) REFERENCES `MembershipType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
