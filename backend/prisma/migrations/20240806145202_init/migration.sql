-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `saldo` DECIMAL NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
