// ==========================================
// PONTO DE ENTRADA DA APLICAÇÃO (main.ts)
// Demonstração das Funcionalidades - Fase 3
// ==========================================

import {
  listarProdutos,
  buscarProdutoPorId,
} from "./produtos";

import {
  listarClientes,
  buscarClientePorId,
  cadastrarCliente,
} from "./clientes";

import {
  adicionarAoCarrinho,
  alterarQuantidadeCarrinho,
  removerDoCarrinho,
  exibirResumoCarrinho,
  calcularTotalCarrinho,
} from "./carrinho";

console.log("==================================================");
console.log("🛒 SISTEMA DE E-COMMERCE (TypeScript & Node.js)");
console.log("TESTE DE FUNCIONALIDADES - FASE 3: CLIENTES E CARRINHO");
console.log("==================================================\n");

// ----------------------------------------------------
// 1. CLIENTES
// ----------------------------------------------------
console.log("--- 1. Listagem dos Clientes Iniciais ---");
console.table(listarClientes());

console.log("\n--- 2. Cadastro de Novo Cliente Válido ---");
cadastrarCliente({
  id: 4,
  nome: "Lucas Pereira",
  email: "lucas.pereira@email.com",
});

console.log("\n--- 3. Teste de Validações em Clientes ---");
console.log("-> Tentativa com ID duplicado (ID 1):");
cadastrarCliente({
  id: 1,
  nome: "Outra Ana",
  email: "outra.ana@email.com",
});

console.log("\n-> Tentativa com E-mail duplicado:");
cadastrarCliente({
  id: 5,
  nome: "Carlos Clone",
  email: "carlos.edu@email.com",
});

console.log("\n-> Tentativa com Nome Vazio:");
cadastrarCliente({
  id: 6,
  nome: "",
  email: "semnome@email.com",
});

// ----------------------------------------------------
// 2. CARRINHO DE COMPRAS
// ----------------------------------------------------
console.log("\n--- 4. Adição de Itens Válidos ao Carrinho ---");
// Produto 1: Teclado Mecânico (Preço: 250, Estoque: 15) -> Adicionar 2 un
adicionarAoCarrinho(1, 2);

// Produto 2: Mouse Gamer (Preço: 120, Estoque: 20) -> Adicionar 3 un
adicionarAoCarrinho(2, 3);

// Adicionar novamente o Produto 1 para testar acúmulo de quantidade (mais 1 un -> total 3 un)
adicionarAoCarrinho(1, 1);

exibirResumoCarrinho();

console.log("\n--- 5. Testes de Validações no Carrinho ---");

console.log("\n-> Tentativa 1: Quantidade menor ou igual a zero:");
adicionarAoCarrinho(3, 0);

console.log("\n-> Tentativa 2: Produto inexistente (ID 999):");
adicionarAoCarrinho(999, 1);

console.log("\n-> Tentativa 3: Quantidade superior ao estoque disponível:");
// Produto 3 (Monitor) tem 8 no estoque, tentar adicionar 10
adicionarAoCarrinho(3, 10);

console.log("\n--- 6. Alteração e Remoção no Carrinho ---");
// Alterar quantidade do Mouse Gamer (ID 2) de 3 para 5
alterarQuantidadeCarrinho(2, 5);

// Adicionar um produto temporário para depois remover
adicionarAoCarrinho(4, 1);
console.log("\nCarrinho antes da remoção:");
exibirResumoCarrinho();

// Remover produto ID 4
removerDoCarrinho(4);

console.log("\nCarrinho após remover o produto ID 4:");
exibirResumoCarrinho();

console.log("\n==================================================");
console.log(`Fase 3 executada com sucesso! Total atual do carrinho: R$ ${calcularTotalCarrinho().toFixed(2)}`);
console.log("==================================================");
