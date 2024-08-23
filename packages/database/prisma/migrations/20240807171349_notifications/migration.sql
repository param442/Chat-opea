/*
  Warnings:

  - A unique constraint covering the columns `[userId,followerId]` on the table `notifications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followerId` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "followerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "notifications_userId_followerId_key" ON "notifications"("userId", "followerId");
