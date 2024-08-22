/*
  Warnings:

  - You are about to drop the column `type` on the `Pets` table. All the data in the column will be lost.
  - Added the required column `animal_id` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "type",
ADD COLUMN     "animal_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
