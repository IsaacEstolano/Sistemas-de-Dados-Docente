import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importacao() {
   const filePath = path.resolve(__dirname, "./Data/dados.json");
   console.log("📄 Lendo arquivo:", filePath);

   let raw;
   try {
      raw = await fs.readFile(filePath, "utf-8");
   } catch (err) {
      console.error("❌ Não foi possível ler o arquivo de dados:", err.message);
      return;
   }

   let data;
   try {
      data = JSON.parse(raw);
   } catch (err) {
      console.error("❌ JSON inválido:", err.message);
      return;
   }

   if (!Array.isArray(data)) {
      console.error("❌ O conteúdo do arquivo não é um array.");
      return;
   }

   console.log(`🔎 Registros encontrados no arquivo: ${data.length}`);

   let sucesso = 0;
   let ignorados = 0;
   let erros = 0;

   // Agrupar dados por nome do professor
   const professoresAgrupados = data.reduce((acc, original) => {
      const nome = original.nome;
      if (!acc[nome]) {
         acc[nome] = {
            nome,
            anoPeriodo: original.anoPeriodo, // Use o primeiro anoPeriodo encontrado
            subjects: new Set(), // Set para matérias únicas
         };
      }
      // Adicione matéria se existir (usando fallback para turma)
      const materia = original.materia ?? original.turma;
      if (materia) {
         acc[nome].subjects.add(materia);
      }
      return acc;
   }, {});

   // Converter para array e transformar subjects em array JSON
   const registrosAgrupados = Object.values(professoresAgrupados).map((prof) => ({
      nome: prof.nome,
      anoPeriodo: prof.anoPeriodo ?? null,
      subjects: JSON.stringify([...prof.subjects]), // Array único como string JSON
   }));

   for (const registro of registrosAgrupados) {
      // Validação: verifique se nome e subjects não estão vazios
      if (!registro.nome || !registro.subjects || registro.subjects === "[]") {
         ignorados++;
         console.warn(`⚠️ Registro ignorado por faltar campos obrigatórios. Dados:`, registro);
         continue;
      }

      try {
         await prisma.professor.create({ data: registro });
         sucesso++;
      } catch (err) {
         erros++;
         console.error(`❌ Erro ao inserir (nome=${registro.nome}): ${err.message}`);
      }
   }

   console.log("——— Resumo da Importação ———");
   console.log(`✅ Inseridos: ${sucesso}`);
   console.log(`⚠️  Ignorados (faltando campos): ${ignorados}`);
   console.log(`❌ Erros de inserção: ${erros}`);
}

importacao()
   .catch((e) => {
      console.error("❌ Erro inesperado na importação:", e);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
