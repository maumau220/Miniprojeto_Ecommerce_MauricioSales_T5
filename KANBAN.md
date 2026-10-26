# 📌 KANBAN DO PROJETO - E-COMMERCE BACK-END (Node.js & TypeScript)

**Módulo:** [T5M1]C2.3 - Mini-Projeto Avaliativo  
**Estudante:** Maurício Sales  
**Repositório:** `Miniprojeto_Ecommerce_MauricioSales_T5`

---

## 🚦 Quadro de Status das Sprints / Fases

| Fase | Descrição | Status | Commit / Evidência |
| :--- | :--- | :---: | :--- |
| **Fase 1** | Setup do Ambiente, Configurações (`tsconfig`, `.gitignore`, `package.json`) e Tipos Centrais (`types.ts`) |  **Concluído** | `4f065d2` (25/10/2026 20:48) |
| **Fase 2** | Catálogo de Produtos, Gestão de Estoque e Validações Obrigatórias (`produtos.ts`) |  **Concluído** | `a1d201b` (25/10/2026 21:28) |
| **Fase 3** | Módulo de Clientes e Carrinho de Compras (`clientes.ts`, `carrinho.ts`) |  **Concluído** | `feat: cadastro de clientes e logica do carrinho de compras com calculo de subtotais` (25/10/2026 ~22:15) |
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

## 📝 Documentação da Fase 3 (Concluída)

### 1. Objetivos da Fase 3:
- Implementar o gerenciamento de clientes em `src/clientes.ts` com validação de unicidade de ID e e-mail.
- Desenvolver o carrinho de compras em `src/carrinho.ts` com controle de quantidade, cálculo de subtotais e validação de estoque em tempo real.

### 2. Funções Implementadas em `clientes.ts`:
- 3 clientes pré-cadastrados no array inicial.
- `listarClientes()`: Retorna a lista de clientes.
- `buscarClientePorId(id)`: Localiza cliente por ID.
- `buscarClientePorEmail(email)`: Localiza cliente por e-mail para validação de unicidade.
- `cadastrarCliente(novoCliente)`: Valida nome e e-mail preenchidos, além de unicidade de ID e e-mail.

### 3. Funções Implementadas em `carrinho.ts`:
- `listarCarrinho()` e `limparCarrinho()`.
- `adicionarAoCarrinho(produtoId, quantidade)`: Valida se produto existe, se quantidade > 0 e se quantidade solicitada (inclusive se já houver itens desse produto no carrinho) não excede o estoque disponível. Se o produto já estiver no carrinho, soma a quantidade sem duplicar registros.
- `removerDoCarrinho(produtoId)`: Remove o item do carrinho.
- `alterarQuantidadeCarrinho(produtoId, novaQuantidade)`: Altera a quantidade garantindo que seja positiva e dentro do estoque.
- `calcularSubtotalItem(item)`: Multiplica preço unitário pela quantidade.
- `calcularTotalCarrinho()`: Soma os subtotais através de `.reduce()`.
- `exibirResumoCarrinho()`: Exibe tabela detalhada no terminal com subtotais formatados em R$ e total geral.

### 4. Testes Executados em `src/main.ts`:
- Listagem dos 3 clientes iniciais e cadastro de novo cliente.
- Teste de recusa de ID duplicado, e-mail duplicado e nome vazio em clientes.
- Inserção de itens no carrinho com acúmulo automático de quantidade.
- Teste de recusa de quantidade zero/negativa, produto inexistente e quantidade superior ao estoque.
- Alteração de quantidade e remoção de produto do carrinho, comprovando cálculos automáticos de subtotal e total.

---

## 📋 Detalhamento da Fase 4 (Próxima Fase)

- [ ] Criar `src/pedidos.ts`:
  - Armazenamento em memória `pedidos: Pedido[]`.
  - Implementar `finalizarPedido(clienteId: number): Pedido | null`:
    - Validação de carrinho não vazio.
    - Validação de cliente cadastrado.
    - Validação prévia de estoque para **todos** os itens (garantia atômica / sem desconto parcial).
    - Congelamento dos preços históricos nos itens do pedido.
    - Abatimento do estoque dos produtos em `produtos.ts`.
    - Esvaziamento do carrinho e geração de ID único.
  - Implementar `listarPedidos(): Pedido[]`.
  - Implementar `buscarPedidosPorCliente(clienteId: number): Pedido[]`.
