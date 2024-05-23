-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'User',
ALTER COLUMN "type" SET DEFAULT 'normal';
