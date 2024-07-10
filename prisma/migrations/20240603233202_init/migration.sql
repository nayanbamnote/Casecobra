-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "croppedImageUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
