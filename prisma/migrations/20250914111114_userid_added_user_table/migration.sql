/*
  Warnings:

  - A unique constraint covering the columns `[userid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Buyers_email_key";

-- DropIndex
DROP INDEX "public"."Buyers_phone_key";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "userid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_userid_key" ON "public"."User"("userid");
