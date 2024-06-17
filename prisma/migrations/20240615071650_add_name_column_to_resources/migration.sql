-- AlterTable
ALTER TABLE `event_resources` ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT 'Outline';

-- AlterTable
ALTER TABLE `events` ALTER COLUMN `updatedAt` DROP DEFAULT;
