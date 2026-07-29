import fs from "fs/promises";

const dataUrl = new URL("./Data/dados.json", import.meta.url);
const outUrl = new URL("./Data/dados_processados.json", import.meta.url);

const dados = JSON.parse(await fs.readFile(dataUrl, "utf8"));

const agrupado = {};

for (const item of dados) {
  const chave = `${item.nome}-${item.anoPeriodo}`;

  if (!agrupado[chave]) {
    agrupado[chave] = {
      codigo: item.codigo, 
      anoPeriodo: item.anoPeriodo,
      nome: item.nome,
      materias: new Set(), 
    };
  }

  agrupado[chave].materias.add(item.materia);
}

const resultado = Object.values(agrupado).map(item => ({
  codigo: item.codigo,
  anoPeriodo: item.anoPeriodo,
  nome: item.nome,
  materias: Array.from(item.materias)
}));

await fs.writeFile(outUrl, JSON.stringify(resultado, null, 2), "utf8");

console.log(`Arquivo processado salvo em ${outUrl.pathname}`);
