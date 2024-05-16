-- CreateTable
CREATE TABLE `counters` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `number` INTEGER NOT NULL,

    UNIQUE INDEX `counters_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `regId` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'MEMBER',
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(50) NULL,
    `rememberMe` BOOLEAN NOT NULL DEFAULT false,
    `emailVerifiedAt` DATETIME(3) NULL,
    `emailVerifyToken` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_regId_key`(`regId`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `regId` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `photoURL` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `joined` DATETIME(3) NULL,
    `membershipId` VARCHAR(191) NULL,
    `membershipType` VARCHAR(191) NOT NULL DEFAULT 'STUDENT',
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `members_userId_key`(`userId`),
    UNIQUE INDEX `members_regId_key`(`regId`),
    UNIQUE INDEX `members_email_key`(`email`),
    UNIQUE INDEX `members_phoneNumber_key`(`phoneNumber`),
    UNIQUE INDEX `members_membershipId_key`(`membershipId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `members_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
