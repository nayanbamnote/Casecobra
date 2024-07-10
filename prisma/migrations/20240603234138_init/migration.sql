/*
  Warnings:

  - The primary key for the `nayan` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "nayan" DROP CONSTRAINT "nayan_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "nayan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "nayan_id_seq";
