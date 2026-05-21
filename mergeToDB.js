import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
const prisma = new PrismaClient();

async function mergeAndInsert() {
  try {
    const dataUrl1 = new URL("./Data/dados.json", import.meta.url);
    const dataUrl2 = new URL("../Data/dados.json", import.meta.url); 

    const [raw1, raw2] = await Promise.all([
      fs.readFile(dataUrl1, "utf8"),
      fs.readFile(dataUrl2, "utf8"),
    ]);

    const file1 = JSON.parse(raw1);
    const file2 = JSON.parse(raw2);

    const tamanho = Math.min(file1.length, file2.length);

    const agrupado = {};

    for (let i = 0; i < tamanho; i++) {
      const professorBase = file1[i]; 
      const infoExtra = file2[i];     

      const chave = `${professorBase.nome}-${professorBase.anoPeriodo}`;

      if (!agrupado[chave]) {
        agrupado[chave] = {
          anoPeriodo: professorBase.anoPeriodo,
          nome: professorBase.nome,
          materias: new Set(),
          email: infoExtra?.endEletronico || null,
          sala: infoExtra?.sala || null,
          url: infoExtra?.url || null,
        };
      }

      agrupado[chave].materias.add(professorBase.materia);
    }

    for (const item of Object.values(agrupado)) {
      await prisma.professor.create({
        data: {
          anoPeriodo: item.anoPeriodo,
          nome: item.nome,
          subjects: Array.from(item.materias).join(", "),
          email: item.email,
          sala: item.sala,
          url: item.url,
        },
      });
    }

    console.log("✅ Professores inseridos com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inserir:", error);
  } finally {
    await prisma.$disconnect();
  }
}

mergeAndInsert();
