/*
  Warnings:

  - Added the required column `country` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fans` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fans" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
