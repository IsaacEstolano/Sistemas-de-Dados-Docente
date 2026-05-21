import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//Quadro Docente: https://www.camboriu.ifc.edu.br/quadro-docente-2025-1/
// URLs a serem raspadas
const urls = [
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1879369",//adriana botelho barcellos
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1970752",//adriano martendal
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2771288",//afonso da luz loss
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2567107",//agata regiane quissini
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2322799",//airton zancanaro
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1989957",//alessandra farias millezi
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3449477",//alessandra heidrich
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2046449",//alexandre de aguiar amaral
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2276418",//allan charlles mendes de sousa
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1929423",//amanda moser coelho da fonseca faro
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1775472",//ana cristina franzoi
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1177254",//ana paula resende malheiro amaral
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1445348",//andre fabiano de moraes
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2929224",//andre luiz torrecillas sturion
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1818946",//Andreia cristina gomes monteiro
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1845243",//andreia regina bazzo
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2761694",//andressa graziele brandt
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3446650",//angela beatriz fridrich carlomagno
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1802479",//angelo augusto frozza
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1811967",//antonio jose farias nobrega
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3159543",//antonio jose pereira
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2053454",//araceli goncalves
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1813015",//aujor tadeu cavalca andrade
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3136055",//auro cesar braga
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2255081",//bruno carlesso aita
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1843353",//carla machado de sa stein
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1801514",//carla morschbacher
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1760760",//carlos eduardo nogueira martins
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2279499",//carlos eduardo rebello
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2930008",//caroline paula verona e freitas
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1001908",//claudia oliveira rosa
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1042249",//cleonice maria beppler
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1504842",//cristalina yoshie yoshimura
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2314550",//cristhiane guertler
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1998372",//cristiane regina michelon
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1987974",//daiane heloisa nunes
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2263312",//Daniel de andrade varela
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1441254",//daniel fernando anderle
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2289503",//daniel shikanai kerr
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2183790",//daniele soares de lima
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1488595",//danilo jose ferreira
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1646542",//debora de fatima einhardt jara
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2265342",//degelane cordova duarte
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1414254",//diego das neves de souza
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2919719",//eduardo abel coral
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2311418",//eliana teresinha quartiero
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2357020",//elisangela da silva rocha
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1946758",//elisete da silva mendes soares
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1952346",//everson deon
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3055118",//fabio alves dos santos dias
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1017625",//fabio castanheira
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1634597",//fabiola santini takayama
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1898141",//fabricio da silva barboza
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1010348",//felipe eduardo de pinho barreiros
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1000479",//fernanda carvalho humann
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1755556",//filomena lucia gossler rodrigues da silva
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2141010",//flavia de souza fernandes
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1737475",//flavia walter
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1783505",//flavio leite costa
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1189809",//gabriela dias blanco
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2290173",//gabriela nunes de deus oliveira
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2102086",//gerson carlos saiss
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1811066",//giane lavarda melo
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2372553",//gianfranco da silva araujo
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2190927",//gilberto ferreira de souza
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2771262",//gilmar bolsi
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2818736",//gisele aparecida vivan
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3452838",//gregorio unbehaun leal da silva
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1977051",//guilherme dias
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2773007",//idorlene da silva hoepers
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3413255",//isabelle franco
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1554262",//isadora balsini lucio
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2143041",//ivan carlos serpa
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1461863",//ivanna schenkel fornari grechi
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2169824",//jaime sandro dallago
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2369995",//jardel caminha carvalho cestari
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1455548",//jefferson goncalves acunha
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2411334",//jerffson lucas santos
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1995919",//joaquim manoel monteiro valverde
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1627189",//joice seleme mota
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2169761",//jose daniel cazale
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1331436",//jose luiz ungericht junior
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1823614",//kleber ersching
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3355668",//larise piccinini
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1653488",//larissa regis fernandes
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1811328",//leisi fernanda moya
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3681649",//leonardo goulart nunes
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1200633",//leonardo talavera campos
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2102142",//leticia flohr
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2103747",//leticia lenzi
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1491802",//leticia pinto rabelo
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2182509",//livia da silva perenha
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3392172",//lucas gabriel soares
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3451511",//lucas martini
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1347559",//luciana colussi
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1811380",//luciane grando dorneles ungericht
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1818931",//luis ivan martinhao souto
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1272610",//luiz alexandre devegili
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1567643",//luiz alvaro monteiro junior
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2456317",//luiz felipe ungericht
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2265320",//magali dias de souza
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2445366",//marcelo fernando rauber
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2277873",//marcos alexandre heinig
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1979915",//marcus vinicius machado carneiro
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1412251",//mateus bender
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2263234",//maria aparecida de souza ramos
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1169872",//maria salete
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1715961",//marilandes mol ribeiro de melo
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2813207",//marina tete vieira
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1759705",//marines kerber
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2616562",//marli fatima vick vieira
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1858287",//mauricio gustavo rodrigues
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1988103",//melissa meier
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1716170",//milena cristina franca
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3616051",//mirela bernieri
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3402983",//mirian de oliveira cardoso
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2333430",//monique koerich simas ersching
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1984469",//nadia rocha veriguine
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1355434",//patricia stulp
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1315707",//paulo fernando kuss
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1276108",//rafael carlos velez benito
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3464778",//rafael da silva da rosa
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1578494",//rafael de moura speroni
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1071960",//rafael bernardo silveira
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3410527",//rafaella horstmann
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1098175",//railson schreinert dos santos
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2773042",//renata ogusucu
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3122668",//roberta pereira de avila
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1812901",//roberta raquel
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2059068",//rodolfo augusto bravo de conto
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1147477",//rodrigo de paula e silva ribeiro
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3401981",//rodrigo nery e costa
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2336621",//rodrigo pereira de souza
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2140304",//rodrigo souza banegas
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=387352",//rogerio luis kerber
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1872842",//rosana ceolin meneghetti
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1901273",//rosane pedron carneiro
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1431375",//roseli nazario
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1812919",//rossano linassi
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1308378",//sanir da conceicao
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1757038",//sonia regina de souza fernandes
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1882937",//thaysi ventura de souza
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1629341",//thiago henrique das neves barbosa
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1905021",//tiago mazzutti
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=2387470",//viviane furtado velho
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=3449493",//wesley freitas souza
  "https://sig.ifc.edu.br/sigaa/public/docente/disciplinas.jsf?siape=1642616",//wilson jose morandi filho



]

console.log("process.cwd():", process.cwd());
console.log("import.meta.url:", import.meta.url);

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.join(__filename);

const ARQUIVO_DADOS = path.join(__dirname,"../../Data/dados.json");
const ARQUIVO_BACKUP = path.join(__dirname,"../../Data/dadosBackup.json")
;

const getDisciplinas = async () => {
  console.log("🚀 Iniciando processo...");

  try {
    let existingData = [];
    try {
      const data = await fs.readFile(ARQUIVO_DADOS, "utf8");
      existingData = JSON.parse(data);
      console.log(`✅ Dados antigos carregados. Total: ${existingData.length} registros.`);
    } catch (err) {
      if (err.code === "ENOENT") {
        console.warn("⚠️ Arquivo não encontrado. Criando novo arquivo...");
        await fs.writeFile(ARQUIVO_DADOS, "[]");
        console.log("📄 Novo arquivo criado.");
      } else {
        throw new Error(`Erro ao ler arquivo original: ${err.message}`);
      }
    }

    console.log("📦 Iniciando backup...");
    try{
      await fs.writeFile(ARQUIVO_BACKUP, JSON.stringify(existingData, null, 2));
      console.log("✅ Backup realizado com sucesso.");

    }catch(err){
      throw new Error(`Erro ao realizar backup: ${err.message}`)
    }

    const listJSON = [];

    console.log(`🔗 Iniciando scraping em ${urls.length} URLs...`);

    for (const [index, url] of urls.entries()) {
      console.log(`🌐 Processando URL ${index + 1} de ${urls.length}: ${url}`);

      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      let anoAtual = null;
      let nome=null
      let codigo=null
      $("#corpo #center #id-docente").each((index, element) => {
        nome = $(element).find("h3").text().trim();
      });

      console.log(nome);
      $("table.listagem tbody tr").each((index, element) => {
        const tdAno = $(element).find("td.anoPeriodo");
        if (tdAno.length) {
          anoAtual = tdAno.text().trim();
          return;
        }
        //const codigoMateria = $(element).find("td.codigo").text().trim();
        const materia = $(element).find("td:nth-child(2) a").text().trim();
        //const cargaHoraria = $(element).find("td.ch").text().trim();
        //const horario = $(element).find("td.horario").text().trim();

        const verificacaoCampos =  materia  && anoAtual && nome ;
        const verificacaoAno = anoAtual && anoAtual.startsWith("2025");        
      
          if (verificacaoCampos && verificacaoAno) {
            codigo++;
            listJSON.push({
              codigo,
              anoPeriodo: anoAtual.slice(0, 4),
              nome,
              materia,
             
            });
        
        }
      });

      console.log(`📌 URL ${index + 1} processada. Itens coletados: ${listJSON.length}`);
    }
   
    


    console.log("🔎 Filtrando itens únicos...");

    const normalize = (s) =>
      (s ?? "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

    const makeKey = (item) =>
      `${normalize(item.nome)}|${normalize(item.materia)}|${normalize(item.anoPeriodo)}`;

    const existingKeys = new Set(existingData.map((it) => makeKey(it)));
    const seenNewKeys = new Set();

    const uniqueData = listJSON.filter((item) => {
      const key = makeKey(item);
      if (existingKeys.has(key) || seenNewKeys.has(key)) return false;
      seenNewKeys.add(key);
      return true;
    });

    console.log(`➕ Adicionando ${uniqueData.length} novos itens únicos.`);

    const updatedData = [...existingData, ...uniqueData];
    const dataJSON = JSON.stringify(updatedData, null, 2);

    console.log("💾 Salvando dados atualizados...");

    await fs.writeFile(ARQUIVO_DADOS, dataJSON);
    await fs.writeFile(ARQUIVO_BACKUP,dataJSON)

    console.log("🎉 Processo concluído com sucesso!");
    console.log(`📊 Total de registros após atualização: ${updatedData.length}`);
    console.log(`📄 Dados salvos em: ${ARQUIVO_DADOS}`);
    console.log(`📦 Backup salvo em: ${ARQUIVO_BACKUP}`);

  } catch (error) {
    console.error(`❌ Erro durante o processo: ${error.message}`);
  }
};

getDisciplinas();
