-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);
