/*
  Warnings:

  - You are about to drop the column `identifier` on the `verification_tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Email,token]` on the table `verification_tokens` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `Email` to the `verification_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "verification_tokens_identifier_token_key";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "verification_tokens" DROP COLUMN "identifier",
ADD COLUMN     "Email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_Email_token_key" ON "verification_tokens"("Email", "token");
