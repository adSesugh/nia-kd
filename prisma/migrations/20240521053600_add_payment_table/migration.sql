-- CreateTable
CREATE TABLE `payments` (
    `id` VARCHAR(191) NOT NULL,
    `memberId` VARCHAR(191) NOT NULL,
    `duesId` VARCHAR(191) NOT NULL,
    `paymentRef` VARCHAR(191) NOT NULL,
    `status` VARCHAR(15) NOT NULL DEFAULT 'Successful',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payments_paymentRef_key`(`paymentRef`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `members`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_duesId_fkey` FOREIGN KEY (`duesId`) REFERENCES `dues`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
