/*
  Warnings:

  - Added the required column `start_time` to the `compaigns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `compaigns` ADD COLUMN `start_time` DATETIME(3) NOT NULL;
