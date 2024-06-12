-- AlterTable
ALTER TABLE `events` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ALTER COLUMN `updatedAt` DROP DEFAULT;
