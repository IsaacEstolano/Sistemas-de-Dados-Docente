/*
  Warnings:

  - You are about to drop the column `url` on the `Professor` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "anoPeriodo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "subjects" TEXT NOT NULL,
    "endProfissional" TEXT,
    "sala" TEXT DEFAULT 'Não informado',
    "email" TEXT DEFAULT 'Não informado'
);
INSERT INTO "new_Professor" ("anoPeriodo", "email", "id", "nome", "sala", "subjects") SELECT "anoPeriodo", "email", "id", "nome", "sala", "subjects" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
