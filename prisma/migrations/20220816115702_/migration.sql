/*
  Warnings:

  - You are about to drop the column `loot_moderator_role` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `loot_require_verification` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `pets_moderator_role` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "loot_moderator_role",
DROP COLUMN "loot_require_verification",
DROP COLUMN "pets_moderator_role",
ADD COLUMN     "loot_moderation_enabled" TEXT,
ADD COLUMN     "loot_moderation_role" TEXT,
ADD COLUMN     "pets_moderation_enabled" TEXT,
ADD COLUMN     "pets_moderation_role" TEXT;
