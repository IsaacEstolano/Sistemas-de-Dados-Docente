import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

// const dadosExtras = [
//   {
//     "endProfissional": "não informado",
//     "sala": "não informado",
//     "endEletronico": "drikabarcellos@hotmail.com"
// },
//   {
//     "endProfissional": "afonso.loss@ifc.edu.br",
//     "sala": "não informado",
//     "endEletronico": "afonsoloss@gmail.com"
//   },
//   {
//     "endProfissional": "INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA CATARINENSE - CAMPUS CAMBORIÚRUA JOAQUIM GARCIA S/N - CAIXA POSTAL Nº 2016 - CEP 88340-055 - CAMBORIÚ - SC",
//     "sala": "A-013",
//     "endEletronico": "não informado"
//   },
//   {
//     "endProfissional": "Instituto Federal de Educação, Ciência e Tecnologia Catarinense - Campus Camboriú",
//     "sala": "não informado",
//     "endEletronico": "agata.quissini@ifc.edu.br"
// }
// ];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataUrl2 = new URL("../Data/dados.json", import.meta.url);


const [raw2] = await Promise.all([
    fs.readFile(dataUrl2, "utf8"),

    ]);
    const file2 = JSON.parse(raw2);



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
   

   const nomesUnicos = [];
   const vistos = new Set();
   for (const item of data) {
     if (!vistos.has(item.nome)) {
       vistos.add(item.nome);
       nomesUnicos.push(item.nome);
     }
   }
   
  const mapaExtras = {};
for (let i = 0; i < Math.min(nomesUnicos.length, file2.length); i++) {
   const nomeNormalizado = nomesUnicos[i].trim().toLowerCase();
   mapaExtras[nomeNormalizado] = file2[i];
}

   const professoresAgrupados = data.reduce((acc, original) => {
      const nome = original.nome;
      if (!acc[nome]) {
         acc[nome] = {
            nome,
            anoPeriodo: original.anoPeriodo, 
            subjects: new Set(), 
         };
      }
      const materia = original.materia ?? original.turma;
      if (materia) {
         acc[nome].subjects.add(materia);
      }
      return acc;
   }, {});

  const registrosAgrupados = Object.values(professoresAgrupados).map((prof) => {
   const nomeNormalizado = prof.nome.trim().toLowerCase();
   const extras = mapaExtras[nomeNormalizado] || {};
   return {
      nome: prof.nome,
      anoPeriodo: prof.anoPeriodo ?? null,
      subjects: JSON.stringify([...prof.subjects]),
      endProfissional: extras.endProfissional ?? null,
      sala: extras.sala ?? null,
      email: extras.endEletronico ?? null, 
   };
});

   for (const registro of registrosAgrupados) {
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
