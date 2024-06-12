-- AlterTable
ALTER TABLE `events` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'Published',
    ALTER COLUMN `updatedAt` DROP DEFAULT;
