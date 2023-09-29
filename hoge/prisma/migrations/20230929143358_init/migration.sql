/*
  Warnings:

  - Added the required column `name` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` ADD COLUMN `name` VARCHAR(191) NOT NULL;
