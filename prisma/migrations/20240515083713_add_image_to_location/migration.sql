/*
  Warnings:

  - Added the required column `imageUrl` to the `Coords` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coords" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "addedByUserId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Coords" ("addedByUserId", "address", "createdAt", "description", "id", "lat", "lng", "updatedAt") SELECT "addedByUserId", "address", "createdAt", "description", "id", "lat", "lng", "updatedAt" FROM "Coords";
DROP TABLE "Coords";
ALTER TABLE "new_Coords" RENAME TO "Coords";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
