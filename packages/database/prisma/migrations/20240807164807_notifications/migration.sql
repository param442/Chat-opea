/*
  Warnings:

  - Added the required column `followerName` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "followerImage" TEXT,
ADD COLUMN     "followerName" TEXT NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;
