# 📌 KANBAN DO PROJETO - E-COMMERCE BACK-END (Node.js & TypeScript)

**Módulo:** [T5M1]C2.3 - Mini-Projeto Avaliativo  
**Estudante:** Maurício Sales  
**Repositório:** `Miniprojeto_Ecommerce_MauricioSales_T5`

---

## 🚦 Quadro de Status das Sprints / Fases

| Fase | Descrição | Status | Commit / Evidência |
| :--- | :--- | :---: | :--- |
| **Fase 1** | Setup do Ambiente, Configurações (`tsconfig`, `.gitignore`, `package.json`) e Tipos Centrais (`types.ts`) |  **Concluído** | `4f065d2` (25/10/2026 20:48) |
| **Fase 2** | Catálogo de Produtos, Gestão de Estoque e Validações Obrigatórias (`produtos.ts`) |  **Concluído** | `feat: implementacao do modulo de gerenciamento de produtos e validacoes de estoque` (25/10/2026 ~21:28) |
| **Fase 3** | Módulo de Clientes e Carrinho de Compras (`clientes.ts`, `carrinho.ts`) | ⏳ **A Fazer** | - |
| **Fase 4** | Fechamento de Pedidos e Controle Atômico de Estoque (`pedidos.ts`) | ⏳ **A Fazer** | - |
| **Fase 5** | Integração Completa, Relatórios e Testes no Terminal (`relatorios.ts`, `main.ts`) | ⏳ **A Fazer** | - |
| **Fase 6** | Documentação Final (`README.md`), Revisão dos Critérios e Submissão no AVA | ⏳ **A Fazer** | - |

---

## 📝 Documentação da Fase 1 (Concluída)

### 1. Objetivos da Fase 1:
- Configurar o ambiente TypeScript e Node.js para suportar a compilação e execução local.
- Garantir que a pasta `dist/` gerada pelo compilador e as dependências em `node_modules/` não sejam versionadas.
- Definir os tipos primitivos e estruturas centrais de dados em `src/types.ts`.

### 2. Arquivos Criados:
- `.gitignore`: Ignorando `node_modules/`, `dist/` e arquivos temporários.
- `package.json`: Definição de dependências (`typescript`, `@types/node`) e scripts (`build`, `start`).
- `tsconfig.json`: Configurado com `rootDir: "./src"`, `outDir: "./dist"`, `target: "ES6"`, `module: "commonjs"`.
- `src/types.ts`: Modelos de tipos explícitos (`Produto`, `Cliente`, `ItemCarrinho`, `ItemPedido`, `Pedido`, Union Types `StatusPedido` e `CategoriaProduto`, além do exemplo didático de Tupla).
- `src/main.ts`: Ponto de entrada básico testando a compilação e execução.

### 3. Validação Técnica Realizada:
- Execução de `npm run build` gerando os arquivos transpilados em `./dist`.
- Execução de `npm start` exibindo o output com sucesso no Node.js v24.
- Primeiro commit semântico realizado: `feat: configuracao inicial do ambiente typescript e definicao dos tipos basicos`.

---

## 📝 Documentação da Fase 2 (Concluída)

### 1. Objetivos da Fase 2:
- Implementar o catálogo e gerenciamento de produtos em memória em `src/produtos.ts`.
- Aplicar métodos de manipulação de array (`find`, `filter`, `findIndex`, `splice`) vistos nas aulas.
- Garantir todas as validações obrigatórias com condicionais `if/else`:
  - Identificador único (não repetido).
  - Nome não vazio (`trim()`).
  - Preço estritamente positivo (`preco > 0`).
  - Estoque não negativo (`estoque >= 0`).

### 2. Funções Implementadas:
- `listarProdutos()`: Retorna todos os produtos do catálogo.
- `buscarProdutoPorId(id)`: Retorna o produto pelo ID utilizando `.find()`.
- `buscarProdutosPorNome(termo)`: Busca produtos contendo parte do nome informado (`.filter()` + `.includes()`).
- `filtrarProdutosPorCategoria(categoria)`: Filtra os itens por categoria exata (`.filter()`).
- `cadastrarProduto(novoProduto)`: Valida ID único, nome, preço e estoque antes de adicionar.
- `atualizarProduto(id, novosDados)`: Atualiza campos específicos garantindo que as regras de negócio permaneçam válidas.
- `removerProduto(id)`: Remove o produto do catálogo pelo ID.

### 3. Testes Executados em `src/main.ts`:
- Listagem inicial com 5 produtos pré-cadastrados.
- Busca por ID existente e busca parcial por nome ("Gamer").
- Filtragem por categoria ("Periféricos").
- Cadastro com sucesso de novo produto.
- Rejeição de 4 casos inválidos: ID duplicado, preço negativo, estoque negativo e nome em branco.
- Atualização e posterior remoção com validação no console.

---

## 📋 Detalhamento da Fase 3 (Próxima Fase)

- [ ] Criar `src/clientes.ts`:
  - Array com 3 clientes iniciais.
  - Funções: `cadastrarCliente`, `listarClientes`, `buscarClientePorId`.
  - Validações: ID único, e-mail único, nome e e-mail preenchidos.
- [ ] Criar `src/carrinho.ts`:
  - Funções: `adicionarAoCarrinho`, `removerDoCarrinho`, `alterarQuantidadeCarrinho`, `listarCarrinho`, `calcularSubtotalItem`, `calcularTotalCarrinho`, `limparCarrinho`.
  - Validações: Produto existente, quantidade > 0, limite de estoque disponível, somar quantidade caso o item já exista no carrinho.
