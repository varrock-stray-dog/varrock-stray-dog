-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "prefix" TEXT NOT NULL DEFAULT '~',
    "language" TEXT NOT NULL DEFAULT 'en-US',
    "pets_enabled" BOOLEAN NOT NULL DEFAULT true,
    "pets_moderator_role" TEXT,
    "loot_enabled" BOOLEAN NOT NULL DEFAULT true,
    "loot_require_verification" BOOLEAN NOT NULL DEFAULT true,
    "loot_moderator_role" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pets" (
    "id" TEXT NOT NULL,
    "kc" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_guild_id_key" ON "Settings"("guild_id");
