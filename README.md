# InovaWeek App

## Sobre o Projeto

O **InovaWeek App** foi desenvolvido para gerenciar e exibir informações sobre grupos participantes do evento **Inova Week**, promovendo uma experiência intuitiva e eficiente para organizar os grupos, avaliar notas e exibir os melhores classificados. O aplicativo permite que usuários autenticados acessem informações sobre grupos e seus integrantes, visualizem os destaques e naveguem entre as funcionalidades de forma fluida.

O projeto foi desenvolvido utilizando **React Native** com **Expo**, integrado ao banco de dados **Supabase** para autenticação, armazenamento e gerenciamento de dados.

---

## Funcionalidades Principais

1. **Autenticação de Usuários**:

   - Login utilizando Supabase.
   - Acesso controlado a páginas restritas (como `/main/main` e `/main/all-groups`) apenas após autenticação.
2. **Visualização de Grupos**:

   - Exibição de grupos com as melhores notas na página principal.
   - Modal para exibir detalhes completos de cada grupo, incluindo integrantes e descrição.
3. **Carregamento de Grupos**:

   - Página que exibe todos os grupos do banco de dados com paginação, permitindo carregar mais grupos sob demanda.

---

## Estrutura do Banco de Dados

O banco de dados foi projetado utilizando o **Supabase**, para que o projeto funcione corretamente é de suma importância que as tabelas estejam com os mesmos nomes e colunas das tabelas abaixo, para criar essas tabelas utilize o script logo abaixo no SQL Editor do Supabase:

### 1. **`usuario`**

Tabela que armazena as informações principais de cada grupo.

- **Colunas**:
  - `id` [uuid]: Identificador único do usuário, gerado automaticamente.
  - `email` [text]: Email do usuário.
  - `senha` [text]: Senha do usuário.
  - `criado_em` [timestamp]: Data e Hora da criação do usuário.

### 2. **`grupos`**

Tabela que armazena as informações principais de cada grupo.

- **Colunas**:
  - `id` [uuid]: Identificador único do grupo, gerado automaticamente.
  - `nome` [varchar(255)]: Nome do grupo.
  - `tema` [varchar(255)]: Tema do grupo.
  - `descricao` (text): Descrição detalhada do grupo.

### 3. **`alunos`**

Tabela que relaciona os alunos aos grupos e armazena detalhes dos integrantes.

- **Colunas**:
  - `id` [uuid]: Identificador único do aluno, gerado automaticamente.
  - `nome` [varchar(255)]: Nome do integrante.
  - `curso` [varchar(255)]: Curso associado ao integrante.
  - `grupo_id` [uuid]: Identificador do grupo ao qual o aluno pertence (chave estrangeira para `grupos`).

### 4. **`avaliacoes`**

Tabela que armazena as avaliações feitas nos grupos, incluindo a nota final.

- **Colunas**:
  - `id` [uuid]: Identificador único da avaliação, gerado automaticamente.
  - `grupo_id` [uuid]: Identificador do grupo avaliado (chave estrangeira para `grupos`).
  - `nota` [float]: Nota atribuída ao grupo.
  - `feedback` [text]: Comentário sobre a nota do grupo.

Confira abaixo o script para a criação do banco de dados:

```sql
-- Criação de uma conta na nossa aplicação
create table
  public.usuario (
    id uuid not null default gen_random_uuid (),
    email text not null,
    senha text not null,
    criado_em timestamp with time zone not null default now(),
    constraint usuario_pkey primary key (id)
  ) tablespace pg_default;

-- Criação das tabelas referente aos grupos.
-- Criação da tabela "grupos"
create table
  public.grupos (
    id uuid not null default gen_random_uuid (),
    nome character varying(255) not null,
    descricao text null,
    tema character varying(255) not null,
    constraint grupos_pkey primary key (id)
  ) tablespace pg_default;

-- Criação da tabela "alunos"
create table
  public.alunos (
    id uuid not null default gen_random_uuid (),
    nome character varying(255) not null,
    email character varying(255) not null,
    curso character varying(255) not null,
    grupo_id uuid null,
    constraint alunos_pkey primary key (id),
    constraint alunos_email_key unique (email),
    constraint fk_grupo foreign key (grupo_id) references grupos (id) on delete set null
  ) tablespace pg_default;

-- Criação da tabela "avaliacoes"
create table
  public.avaliacoes (
    id uuid not null default gen_random_uuid (),
    grupo_id uuid not null,
    nota numeric(5, 2) not null,
    feedback text null,
    constraint avaliacoes_pkey primary key (id),
    constraint avaliacoes_grupo_id_key unique (grupo_id),
    constraint fk_grupo_avaliacao foreign key (grupo_id) references grupos (id) on delete cascade
  ) tablespace pg_default;
```



## Populando Banco de Dados

Para uma melhor experiência execute os códigos SQL no SQL Editor do Supabase. Cada código popula uma tabela do banco de dados.

## Estrutura do Banco de Dados

O banco de dados foi projetado utilizando o **Supabase**, para que o projeto funcione corretamente é de suma importância que as tabelas estejam com os mesmos nomes e colunas das tabelas abaixo:

## Como o Projeto Funciona

1. **Autenticação**:

   - O usuário é direcionado para a página de login (`/login`).
   - Após autenticação bem-sucedida, o usuário é redirecionado para a página principal (`/main/main`).
2. **Página Principal (`/main/main`)**:

   - Exibe os 5 grupos com as melhores notas.
   - Cada grupo é exibido como um card clicável.
   - Ao clicar em um card, abre-se um modal com informações detalhadas do grupo.
3. **Lista de Grupos (`/main/all-groups`)**:

   - Exibe todos os grupos cadastrados, paginados em blocos de 10.
   - Botão "Carregar mais" permite carregar mais grupos sem substituir os já exibidos.
   - Modal para exibir detalhes completos de qualquer grupo.

---

## Como Executar o Projeto

### Pré-requisitos

1. Node.js e npm instalados.
2. Expo CLI instalado globalmente.
3. **Supabase configurado com as tabelas mencionadas**.

### Configuração

1. Clone o repositório:

   ```bash
   git clone <repo-url>
   cd <project-folder>
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Configure o Supabase:

   - Crie um arquivo `supabase.js` no diretório `lib/`.
   - Adicione a seguinte configuração:
     ```javascript
     import { createClient } from '@supabase/supabase-js';

     const supabaseUrl = '<your-supabase-url>';
     const supabaseKey = '<your-supabase-key>';

     export const supabase = createClient(supabaseUrl, supabaseKey);
     ```
4. Inicie o servidor de desenvolvimento:

   ```bash
   npx expo start
   ```

---

## Estrutura de Diretórios

- **`/components`**: Componentes reutilizáveis, como a barra de navegação.
- **`/lib`**: Configuração do Supabase.
- **`/screens`**: Contém todas as telas do aplicativo.
- **`/context`**: Contém o contexto de autenticação.
