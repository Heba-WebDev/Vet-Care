/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Owners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `Owners` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Animals" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSupported" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Owners_email_key" ON "Owners"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Owners_phone_number_key" ON "Owners"("phone_number");
