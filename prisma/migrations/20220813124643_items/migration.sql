-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "osrs_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "high_alch" INTEGER NOT NULL,
    "low_alch" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "ge_high" INTEGER,
    "ge_low" INTEGER,
    "ge_high_time" TIMESTAMP(3),
    "ge_low_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Items_osrs_id_key" ON "Items"("osrs_id");
