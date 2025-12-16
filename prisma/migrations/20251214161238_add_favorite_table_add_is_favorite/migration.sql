/*
  Warnings:

  - You are about to drop the column `prepTime` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `servings` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `recipes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "prepTime",
DROP COLUMN "servings",
DROP COLUMN "tags";
