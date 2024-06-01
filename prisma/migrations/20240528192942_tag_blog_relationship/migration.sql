/*
  Warnings:

  - The primary key for the `TagOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TagOnPosts` table. All the data in the column will be lost.
  - Made the column `blogId` on table `TagOnPosts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tagId` on table `TagOnPosts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `TagOnPosts` DROP FOREIGN KEY `TagOnPosts_blogId_fkey`;

-- DropForeignKey
ALTER TABLE `TagOnPosts` DROP FOREIGN KEY `TagOnPosts_tagId_fkey`;

-- AlterTable
ALTER TABLE `TagOnPosts` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `blogId` VARCHAR(191) NOT NULL,
    MODIFY `tagId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`blogId`, `tagId`);

-- AddForeignKey
ALTER TABLE `TagOnPosts` ADD CONSTRAINT `TagOnPosts_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `blogs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagOnPosts` ADD CONSTRAINT `TagOnPosts_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
