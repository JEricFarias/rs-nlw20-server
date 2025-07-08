# NLW Agents - Server 🚀

Bem-vindo ao backend do projeto desenvolvido durante o evento **NLW Agents** da **Rocketseat**!

Este servidor é construído com uma stack moderna de Node.js, utilizando Fastify para alta performance, Drizzle ORM para uma interação segura com o banco de dados, e PostgreSQL com a extensão `pgvector` para suportar operações de similaridade de vetores, ideal para aplicações de IA.

## ✨ Tecnologias Principais

Este projeto utiliza uma variedade de ferramentas e bibliotecas de ponta para garantir performance, escalabilidade e uma ótima experiência de desenvolvimento:

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Fastify**: Framework web focado em alta performance e baixo overhead.
- **Drizzle ORM**: ORM "headless" para TypeScript, oferecendo total segurança de tipos nas queries SQL.
- **PostgreSQL**: Banco de dados relacional robusto e extensível.
- **pgvector**: Extensão para PostgreSQL que permite o armazenamento e a busca por similaridade de vetores.
- **Zod**: Biblioteca de declaração e validação de schemas com inferência de tipos.
- **Biome**: Ferramenta integrada para lint e formatação de código, garantindo consistência e qualidade.
- **Docker**: Utilizado para criar um ambiente de desenvolvimento conteinerizado e consistente com o banco de dados.
- **Vitest**: Framework de testes para projetos Vite.

## ⚙️ Setup e Configuração do Ambiente

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

- Node.js (versão 20 ou superior)
- pnpm (ou outro gerenciador de pacotes)
- Docker

### 1. Clonar o Repositório

```bash
git clone git@github.com:JEricFarias/rs-nlw20-server.git server
cd server
```

### 2. Instalar Dependências

Utilize o `pnpm` (recomendado) para instalar todas as dependências do projeto.

```bash
pnpm install
```

### 3. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.

```bash
cp .env.example .env
```

O arquivo `.env` já vem pré-configurado para se conectar com o banco de dados do Docker Compose.

### 4. Iniciar o Banco de Dados com Docker

Com o Docker em execução, suba o container do PostgreSQL com o comando:

```bash
docker-compose up -d
```

Este comando irá criar e iniciar um container com o PostgreSQL e a extensão `pgvector` já habilitada.

### 5. Executar as Migrations do Banco

Para criar as tabelas e estruturas necessárias no banco de dados, execute o script de migração:

```bash
pnpm drizzle-kit migrate
```

```bash
pnpm run db:seed
```

### 6. Iniciar o Servidor

Agora, basta iniciar o servidor de desenvolvimento:

```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3333`.
