# 📚 Sistema de Dados Docentes — IFC Campus Camboriú

> Plataforma web para centralização e consulta de informações do corpo docente do Instituto Federal Catarinense (IFC) – Campus Camboriú.

Desenvolvido como projeto de pesquisa contemplado pelo **Edital nº 038/2024** do IFC Campus Camboriú.

---

## 📖 Sobre o Projeto

O Sistema de Dados Docentes foi desenvolvido para facilitar o acesso dos estudantes às informações do corpo docente do Instituto Federal Catarinense.

Embora o site institucional disponibilize essas informações, muitos alunos encontram dificuldades para localizar rapidamente dados como e-mail institucional, turmas e cursos ministrados. Este sistema centraliza essas informações em uma interface simples, intuitiva e de fácil pesquisa.

Além da interface de consulta, o projeto possui um sistema de **web scraping automatizado**, responsável por coletar e atualizar as informações diretamente do quadro oficial de docentes do IFC.

---
💡 Motivação

A principal motivação para o desenvolvimento deste projeto surgiu da dificuldade recorrente em localizar informações importantes sobre os docentes do **Instituto Federal Catarinense – Campus Camboriú**.

Embora essas informações existam no site institucional, o acesso nem sempre é intuitivo. Muitos estudantes, principalmente os **calouros**, encontram dificuldades para descobrir em qual sala um professor atende, qual é seu e-mail institucional ou quais disciplinas e turmas ministra.

Esse problema é agravado pelo fato de que o campus possui uma estrutura física ampla, com diversas salas de professores distribuídas em diferentes blocos. Como consequência, é comum que alunos recém-ingressos precisem percorrer o campus ou depender da ajuda de terceiros para localizar um docente.

Diante desse cenário, foi desenvolvida uma plataforma que centraliza essas informações em um único local, oferecendo uma interface simples, rápida e intuitiva para consulta. O objetivo é reduzir o tempo gasto na busca por informações, facilitar a comunicação entre estudantes e professores e melhorar a experiência acadêmica dentro da instituição.

---
## ✨ Funcionalidades

- 🔍 Pesquisa de docentes por nome
- 👤 Exibição do nome completo
- 📧 E-mail institucional
- 🏫 Turmas e cursos ministrados
- 🌙 Modo escuro
- ⚙️ Coleta automatizada de dados via Web Scraping
- 🗄️ Armazenamento em banco de dados utilizando Prisma ORM
- 🚀 API REST desenvolvida com Express

---

## 🛠 Tecnologias Utilizadas

| Camada | Tecnologia |
|---------|------------|
| Frontend | HTML5, CSS3 e JavaScript |
| Backend | Node.js + Express |
| Banco de Dados | SQLite |
| ORM | Prisma |
| Web Scraping | Axios + Cheerio |
| Controle de Versão | Git + GitHub |

---

## 🏗 Arquitetura

```
               Quadro Docente IFC
                      │
               Web Scraping
          (Axios + Cheerio)
                      │
                      ▼
                 SQLite Database
                      │
                 Prisma ORM
                      │
                 Express API
                      │
                      ▼
          HTML • CSS • JavaScript
```

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v18 ou superior)
- npm

Clone o repositório:

```bash
git clone https://github.com/IsaacEstolano/Sistemas-de-Dados-Docente.git
```

Entre na pasta do projeto:

```bash
cd Sistemas-de-Dados-Docente
```

Instale as dependências:

```bash
npm install
```

---

## ⚙️ Configuração do Banco de Dados

Gere o cliente Prisma:

```bash
npx prisma generate
```

Caso deseje recriar o banco de dados a partir das migrations:

```bash
npx prisma migrate dev
```

---

## ▶️ Executando o Projeto

Entre na pasta do servidor:

```bash
cd src/services
```

Inicie o servidor:

```bash
node server.js
```

A aplicação ficará disponível em:

```
http://localhost:3000
```

---

## 🗃 Acessando o Banco de Dados

Caso queira visualizar ou editar os registros do banco SQLite:

```bash
npx prisma studio
```

---

## 📁 Estrutura do Projeto

```text
.
├── package.json
├── package-lock.json
├── README.md
│
└── src
    ├── main
    │   ├── index.html
    │   ├── main.css
    │   └── main.js
    │
    ├── Data
    │   ├── dados.json
    │   └── icons/
    │
    ├── data
    │
    └── services
        ├── server.js
        ├── prisma/
        │   ├── schema.prisma
        │   ├── migrations/
        │   └── dev.db
        │
        ├── scraping/
        │   ├── mainScraping.js
        │   └── emailScraping.js
        │
        ├── routes/
        └── controllers/
```

---

## 📊 Status do Projeto

O projeto encontra-se em desenvolvimento contínuo.

### Funcionalidades implementadas

- ✅ Interface web
- ✅ Barra de pesquisa
- ✅ Modo escuro
- ✅ Web Scraping automatizado
- ✅ API REST
- ✅ Banco de dados SQLite
- ✅ Prisma ORM

### Melhorias futuras

- ⏳ Atualização automática periódica dos dados
- ⏳ Melhorias na pesquisa
- ⏳ Cadastro de alunos por matrícula
- ⏳ Melhor responsividade
---

## 🌎 Objetivos de Desenvolvimento Sustentável (ODS)

Este projeto contribui para os seguintes Objetivos da Agenda 2030:

- 📚 **ODS 4 – Educação de Qualidade**
- 🏗 **ODS 9 – Indústria, Inovação e Infraestrutura**
- ⚖️ **ODS 16 – Paz, Justiça e Instituições Eficazes**

---

## 👨‍💻 Autores

**Isaac Furtado Estolano da Silveira**

Estudante do Curso Técnico em Informática

Desenvolvedor da aplicação

---

**Prof. Paulo Fernando Kuss**

Mestre em Educação

Professor Orientador

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos e de pesquisa no Instituto Federal Catarinense (IFC) – Campus Camboriú.

---

## 🏆 Trabalho Acadêmico

Projeto apresentado na **XVI Feira de Iniciação Científica e Extensão (FICE)**.

Categoria: **Pesquisa**

Nível: **Ensino Médio Integrado/Subsequente**
