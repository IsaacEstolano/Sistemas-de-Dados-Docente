-- CreateTable
CREATE TABLE "Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "anoPeriodo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "subjects" TEXT NOT NULL,
    "email" TEXT DEFAULT 'Não informado',
    "sala" TEXT DEFAULT 'Não informado',
    "url" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_nome_key" ON "Professor"("nome");
