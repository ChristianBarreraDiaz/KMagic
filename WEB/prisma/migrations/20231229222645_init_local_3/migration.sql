/*
  Warnings:

  - A unique constraint covering the columns `[ARR_NOM]` on the table `Arreglo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Arreglo" ALTER COLUMN "ARR_DSC" DROP DEFAULT,
ALTER COLUMN "ARR_NOM" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Arreglo_ARR_NOM_key" ON "Arreglo"("ARR_NOM");
