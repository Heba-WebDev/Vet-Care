/*
  Warnings:

  - The primary key for the `PublicHolidays` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "PublicHolidays" DROP CONSTRAINT "PublicHolidays_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PublicHolidays_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PublicHolidays_id_seq";
