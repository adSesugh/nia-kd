/*
  Warnings:

  - Added the required column `charge` to the `event_plan_prices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event_plan_prices` ADD COLUMN `charge` DECIMAL(65, 30) NOT NULL;
