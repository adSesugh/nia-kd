/*
  Warnings:

  - You are about to drop the column `cpdpPoints` on the `members` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `blogs` DROP FOREIGN KEY `blogs_userId_fkey`;

-- AlterTable
ALTER TABLE `blogs` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `events` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `members` DROP COLUMN `cpdpPoints`;

-- CreateTable
CREATE TABLE `CpdpPoint` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NULL,
    `memberId` VARCHAR(191) NULL,
    `points` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CpdpPoint` ADD CONSTRAINT `CpdpPoint_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `members`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
