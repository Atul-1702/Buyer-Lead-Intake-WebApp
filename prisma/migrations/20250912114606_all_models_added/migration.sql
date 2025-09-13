/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."City" AS ENUM ('CHANDIGARH', 'MOHALI', 'ZIRKAPUR', 'PANCHKULA', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."PropertyType" AS ENUM ('APARTMENT', 'VILLA', 'PLOT', 'OFFICE', 'RETAIL');

-- CreateEnum
CREATE TYPE "public"."BHK" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'STUDIO');

-- CreateEnum
CREATE TYPE "public"."Purpose" AS ENUM ('BUY', 'RENT');

-- CreateEnum
CREATE TYPE "public"."Source" AS ENUM ('WEBSITE', 'REFERRAL', 'WALK_IN', 'CALL', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Timeline" AS ENUM ('M_0_3', 'M_3_6', 'GT6M', 'EXPLORING');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('NEW', 'QUALIFIED', 'CONTACTED', 'VISITED', 'NEGOTIATION', 'CONVERTED', 'DROPPED');

-- DropTable
DROP TABLE "public"."user";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Buyers" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "city" "public"."City" NOT NULL DEFAULT 'CHANDIGARH',
    "propertyType" "public"."PropertyType" NOT NULL,
    "bhk" "public"."BHK",
    "purpose" "public"."Purpose" NOT NULL,
    "budgetMin" INTEGER,
    "budgetMax" INTEGER,
    "timeline" "public"."Timeline" NOT NULL,
    "source" "public"."Source" NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "tags" TEXT[],
    "ownerId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Buyers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Buyer_History" (
    "id" SERIAL NOT NULL,
    "buyerId" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL,
    "diff" JSONB NOT NULL,

    CONSTRAINT "Buyer_History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Buyers_email_key" ON "public"."Buyers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Buyers_phone_key" ON "public"."Buyers"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Buyer_History_buyerId_key" ON "public"."Buyer_History"("buyerId");

-- CreateIndex
CREATE UNIQUE INDEX "Buyer_History_changedBy_key" ON "public"."Buyer_History"("changedBy");

-- AddForeignKey
ALTER TABLE "public"."Buyers" ADD CONSTRAINT "Buyers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Buyer_History" ADD CONSTRAINT "Buyer_History_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "public"."Buyers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Buyer_History" ADD CONSTRAINT "Buyer_History_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
