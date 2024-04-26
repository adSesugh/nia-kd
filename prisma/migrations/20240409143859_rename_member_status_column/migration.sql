/*
  Warnings:

  - You are about to drop the column `staus` on the `members` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "members" DROP COLUMN "staus",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';
