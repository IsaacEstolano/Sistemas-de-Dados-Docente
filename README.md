# 📚 Sistema de Dados Docentes — IFC Campus Camboriú

> Plataforma web para centralização e consulta de informações do corpo docente do Instituto Federal Catarinense – Campus Camboriú.

---

## 📌 Sobre o Projeto

Este sistema foi desenvolvido como projeto de pesquisa contemplado pelo **Edital 038/2024** do IFC Campus Camboriú, com o objetivo de facilitar o acesso dos discentes às informações dos docentes da instituição.

O site institucional do IFC já disponibiliza dados do corpo docente, porém muitos alunos enfrentam dificuldades para localizar informações específicas como e-mail, turmas e cursos ministrados. Esta aplicação resolve esse problema centralizando tudo em uma interface de busca simples e direta.

**Autores:**
- **Isaac Furtado Estolano da Silveira** — Estudante do Técnico em Informática, desenvolvedor da aplicação
- **Paulo Fernando Kuss** — Mestre em Educação, professor orientador

---

## ✨ Funcionalidades

- 🔍 **Barra de pesquisa** para localizar docentes rapidamente por nome
- 👤 Exibição de **nome completo**, **e-mail institucional**, **turmas** e **cursos ministrados**
- 🌙 **Modo escuro** disponível na interface
- ⚙️ **Coleta automatizada** de dados via web scraping a partir do quadro docente oficial do IFC
- 🗃️ Dados armazenados em banco de dados com integridade garantida via ORM Prisma

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js + Express |
| Banco de Dados | Prisma ORM |
| Web Scraping | Axios + Cheerio |

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (v18+ recomendado)
- Gerenciador de pacotes npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/sistema-dados-docentes-ifc.git

# Entre na pasta do projeto
cd PPO-IA23-main

# Instale as dependências
npm install
```

### Configuração do Banco de Dados

```bash
# Gere o cliente Prisma
npx prisma generate

# Rode as migrations
npx prisma migrate dev
```

### Coleta de Dados (Web Scraping)

```bash
# Entre nas pastas subsequentes 
cd src/services

```
### Iniciar o Servidor

```bash
node server.js
```

### Se quiser acessar a base de dados rode

```bash
npx prisma studio
``

Acesse em: `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```
sistema-dados-docentes-ifc/
├── public/              # Arquivos estáticos (HTML, CSS, JS do frontend)
├── routes/              # Rotas da API (Express)
├── controllers/         # Lógica de negócio
├── prisma/
│   └── schema.prisma    # Schema do banco de dados
├── scraper/             # Scripts de coleta automatizada de dados
├── server.js            # Ponto de entrada da aplicação
└── package.json
```

---

## 📊 Status do Projeto

**Em desenvolvimento ativo.** As funcionalidades principais já estão operacionais:

- [x] Interface web com barra de pesquisa
- [x] Coleta automatizada via web scraping
- [x] Armazenamento em banco de dados com Prisma
- [x] Modo escuro
- [ ] Atualização periódica automática dos dados
- [ ] Melhorias na interface de busca
- [ ] Cadastro de alunos por número de matrícula
- [ ] Institucionalização oficial pelo Campus

---

## 🌱 Relação com os ODS (Agenda 2030)

Este projeto se conecta a três Objetivos de Desenvolvimento Sustentável:

- **ODS 4 – Educação de Qualidade:** melhora os fluxos de comunicação entre alunos e professores
- **ODS 9 – Indústria, Inovação e Infraestrutura:** uso de tecnologias digitais para modernizar processos acadêmicos
- **ODS 16 – Paz, Justiça e Instituições Eficazes:** promove transparência e organização institucional

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos e de pesquisa no âmbito do IFC Campus Camboriú.

---

> Trabalho apresentado no **XVI FICE** — Categoria: Pesquisa | Nível: Médio Integrado/Subsequente
