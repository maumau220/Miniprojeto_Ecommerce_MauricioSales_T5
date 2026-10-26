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
| **Fase 3** | Módulo de Clientes e Carrinho de Compras (`clientes.ts`, `carrinho.ts`) |  **Concluído** | `b7a6ce7` (25/10/2026 22:15) |
| **Fase 4** | Fechamento de Pedidos e Controle Atômico de Estoque (`pedidos.ts`) |  **Concluído** | `88a1ae1` (25/10/2026 23:50) |
| **Fase 5** | Integração Completa, Relatórios e Testes no Terminal (`relatorios.ts`, `main.ts`) | 🔄 **Aguardando Commit** | *Código implementado, compilado e testado com sucesso* |
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
- `adicionarAoCarrinho(produtoId, quantidade)`: Valida se produto existe, se quantidade > 0 e se quantidade solicitada não excede o estoque disponível. Soma a quantidade sem duplicar registros.
- `removerDoCarrinho(produtoId)`: Remove o item do carrinho.
- `alterarQuantidadeCarrinho(produtoId, novaQuantidade)`: Altera a quantidade garantindo que seja positiva e dentro do estoque.
- `calcularSubtotalItem(item)`: Multiplica preço unitário pela quantidade.
- `calcularTotalCarrinho()`: Soma os subtotais através de `.reduce()`.
- `exibirResumoCarrinho()`: Exibe tabela detalhada no terminal com subtotais formatados em R$ e total geral.

---

## 📝 Documentação da Fase 4 (Concluída)

### 1. Objetivos da Fase 4:
- Implementar a finalização e consulta de pedidos em `src/pedidos.ts`.
- Garantir a integridade do catálogo e histórico de compras:
  - Validação de carrinho não vazio e cliente existente.
  - Verificação atômica de estoque (tudo ou nada).
  - Congelamento dos preços históricos no pedido (imutabilidade após alteração no catálogo).
  - Baixa no estoque dos produtos apenas após sucesso total da validação.
  - Esvaziamento do carrinho pós-compra.

### 2. Funções Implementadas:
- `finalizarPedido(clienteId)`: Orquestra todas as validações, congela preços históricos, debita o estoque, registra a compra e esvazia o carrinho.
- `listarPedidos()`: Retorna o histórico de todos os pedidos.
- `buscarPedidoPorId(id)`: Localiza um pedido específico por ID.
- `buscarPedidosPorCliente(clienteId)`: Filtra pedidos realizados por um determinado cliente.
- `exibirDetalhesPedido(pedido)`: Exibe o recibo completo e formatado do pedido no terminal.

---

## 📝 Documentação da Fase 5 (Implementada e Testada)

### 1. Objetivos da Fase 5:
- Criar o módulo `src/relatorios.ts` para consolidação financeira e monitoramento de estoque.
- Integrar todos os módulos em `src/main.ts` cobrindo 100% dos requisitos do edital (seção 3.4 e Sprint 5):
  - Catálogo, clientes, carrinho, cálculos, pedidos, redução de estoque e relatórios.
  - Demonstração explícita de no mínimo 3 situações inválidas.

### 2. Funções Implementadas em `relatorios.ts`:
- `gerarRelatorioEstoqueBaixo(limite)`: Retorna produtos com estoque crítico (menor ou igual ao limite).
- `calcularFaturamentoTotal()`: Soma de todos os pedidos finalizados utilizando `.reduce()`.
- `calcularTotalItensVendidos()`: Soma a quantidade total de itens físicos comercializados.
- `exibirPainelRelatorios()`: Exibe painel gerencial formatado com total de pedidos, unidades vendidas, faturamento, ticket médio e tabela de estoque crítico.

### 3. Roteiro Demonstrativo em `src/main.ts`:
1. **Catálogo**: Listagem geral, busca por ID, busca parcial por nome e filtragem por categoria. Cadastro de novo produto válido.
2. **Clientes**: Listagem dos 3 iniciais e cadastro de novo cliente.
3. **Carrinho de Compras**: Adição com acúmulo de quantidade, alteração de quantidade, remoção de item e cálculo automático de subtotais e total geral.
4. **Finalização de Pedidos**: Dois pedidos reais processados com recibos detalhados e confirmação visual da baixa de estoque.
5. **Situações Inválidas (Edital 3.4)**:
   - Tentativa de produto com preço negativo.
   - Tentativa de adicionar quantidade superior ao estoque.
   - Tentativa de finalizar pedido com carrinho vazio.
   - Tentativa de cliente com e-mail duplicado.
   - Tentativa de pedido para cliente inexistente.
6. **Consultas**: Listagem de pedidos e busca por cliente.
7. **Relatórios**: Apresentação do painel gerencial consolidado.

---

## 📋 Detalhamento da Fase 6 (Próxima Fase)

- [ ] Elaborar o `README.md` completo atendendo a todos os tópicos avaliativos:
  - Identificação (Aluno e Turma).
  - Objetivo do projeto.
  - Funcionalidades implementadas.
  - Tecnologias e comandos de execução (`npm run build`, `npm start`).
  - Estrutura de arquivos e módulos.
  - Regras de negócio e validações.
  - Limitações conhecidas (armazenamento em memória).
- [ ] Revisão geral do repositório para submissão final no AVA até 26/10 às 22h.
