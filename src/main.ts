// ==========================================
// PONTO DE ENTRADA DA APLICAÇÃO (main.ts)
// Demonstração das Funcionalidades - Fase 2
// ==========================================

import {
  listarProdutos,
  buscarProdutoPorId,
  buscarProdutosPorNome,
  filtrarProdutosPorCategoria,
  cadastrarProduto,
  atualizarProduto,
  removerProduto,
} from "./produtos";

console.log("==================================================");
console.log("🛒 SISTEMA DE E-COMMERCE (TypeScript & Node.js)");
console.log("TESTE DE FUNCIONALIDADES - FASE 2: PRODUTOS");
console.log("==================================================\n");

// 1. Listagem inicial de produtos
console.log("--- 1. Listagem de Todos os Produtos Disponíveis ---");
console.table(listarProdutos());

// 2. Busca por identificador
console.log("\n--- 2. Busca de Produto por ID (Ex: ID 3) ---");
const produtoId3 = buscarProdutoPorId(3);
console.log(produtoId3);

// 3. Busca por parte do nome
console.log("\n--- 3. Busca por Nome Parcial (Ex: 'Gamer') ---");
const produtosGamer = buscarProdutosPorNome("Gamer");
console.log(produtosGamer);

// 4. Filtrar por categoria
console.log("\n--- 4. Filtro por Categoria (Ex: 'Periféricos') ---");
const perifericos = filtrarProdutosPorCategoria("Periféricos");
console.table(perifericos);

// 5. Cadastrar novo produto válido
console.log("\n--- 5. Cadastro de Novo Produto Válido ---");
cadastrarProduto({
  id: 6,
  nome: "Webcam Full HD 1080p",
  categoria: "Acessórios",
  preco: 210.0,
  estoque: 10,
});

// 6. Testes de Validações Obrigatórias (Situações Inválidas)
console.log("\n--- 6. Teste de Validações e Regras de Negócio ---");

console.log("\n-> Tentativa 1: Cadastrar com ID repetido (ID 1)");
cadastrarProduto({
  id: 1,
  nome: "Teclado Repetido",
  categoria: "Periféricos",
  preco: 150.0,
  estoque: 5,
});

console.log("\n-> Tentativa 2: Cadastrar com preço menor ou igual a zero (Preço R$ -10)");
cadastrarProduto({
  id: 7,
  nome: "Mouse Pad Inválido",
  categoria: "Acessórios",
  preco: -10.0,
  estoque: 10,
});

console.log("\n-> Tentativa 3: Cadastrar com estoque negativo (-5)");
cadastrarProduto({
  id: 8,
  nome: "Cabo HDMI Inválido",
  categoria: "Acessórios",
  preco: 30.0,
  estoque: -5,
});

console.log("\n-> Tentativa 4: Cadastrar com nome vazio");
cadastrarProduto({
  id: 9,
  nome: "   ",
  categoria: "Acessórios",
  preco: 50.0,
  estoque: 10,
});

// 7. Atualização de informações de produto
console.log("\n--- 7. Atualização de Produto (ID 6: alterar preço para R$ 190.00 e estoque para 15) ---");
atualizarProduto(6, { preco: 190.0, estoque: 15 });
console.log(buscarProdutoPorId(6));

// 8. Remoção de produto
console.log("\n--- 8. Remoção de Produto (Remover ID 6) ---");
removerProduto(6);
console.log("Verificação do produto removido:", buscarProdutoPorId(6));

console.log("\n==================================================");
console.log("Fase 2 executada com sucesso!");
console.log("==================================================");
