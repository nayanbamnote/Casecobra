/*
  Warnings:

  - The primary key for the `nayan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `nayan` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "nayan" DROP CONSTRAINT "nayan_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "nayan_id_key" ON "nayan"("id");
