-- CreateTable
CREATE TABLE "User" (
    "id_" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "year_name" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_")
);
