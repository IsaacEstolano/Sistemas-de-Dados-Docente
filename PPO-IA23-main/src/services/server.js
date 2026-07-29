import express from 'express';
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename)

app.use(
  express.static(
    path.join(__dirname,"../main")
  )
)
app.use(cors());

app.get("/api/professores", async (req, res) => {
  try {
    const professores = await prisma.professor.findMany();
    res.json(professores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar professores" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
