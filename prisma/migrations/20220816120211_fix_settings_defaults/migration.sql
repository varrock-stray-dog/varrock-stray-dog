/*
  Warnings:

  - The `loot_moderation_enabled` column on the `Settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pets_moderation_enabled` column on the `Settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "loot_moderation_enabled",
ADD COLUMN     "loot_moderation_enabled" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "pets_moderation_enabled",
ADD COLUMN     "pets_moderation_enabled" BOOLEAN NOT NULL DEFAULT false;
