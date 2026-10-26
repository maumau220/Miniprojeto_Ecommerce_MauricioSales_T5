// ==========================================
// PONTO DE ENTRADA DA APLICAÇÃO (main.ts)
// Demonstração das Funcionalidades - Fase 4
// ==========================================

import {
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
} from "./produtos";

import {
  listarClientes,
  buscarClientePorId,
} from "./clientes";

import {
  adicionarAoCarrinho,
  exibirResumoCarrinho,
  limparCarrinho,
} from "./carrinho";

import {
  finalizarPedido,
  listarPedidos,
  buscarPedidosPorCliente,
  exibirDetalhesPedido,
} from "./pedidos";

console.log("==================================================");
console.log("🛒 SISTEMA DE E-COMMERCE (TypeScript & Node.js)");
console.log("TESTE DE FUNCIONALIDADES - FASE 4: PEDIDOS E ESTOQUE");
console.log("==================================================\n");

// ----------------------------------------------------
// 1. FLUXO DE SUCESSO: COMPRA DO CLIENTE 1 (Ana Silva)
// ----------------------------------------------------
console.log("--- 1. Estado Inicial do Estoque dos Produtos 1 e 2 ---");
console.log("Produto 1 (Teclado):", buscarProdutoPorId(1));
console.log("Produto 2 (Mouse):", buscarProdutoPorId(2));

console.log("\n--- 2. Montando o Carrinho para Ana Silva (Cliente ID 1) ---");
adicionarAoCarrinho(1, 2); // 2 Teclados (Estoque inicial: 15)
adicionarAoCarrinho(2, 3); // 3 Mouses (Estoque inicial: 20)
exibirResumoCarrinho();

console.log("\n--- 3. Finalizando Pedido da Ana Silva ---");
const pedidoAna = finalizarPedido(1);
if (pedidoAna) {
  exibirDetalhesPedido(pedidoAna);
}

console.log("\n--- 4. Conferindo Atualização do Estoque Pós-Venda ---");
console.log("Produto 1 (deve ter 13 em estoque):", buscarProdutoPorId(1));
console.log("Produto 2 (deve ter 17 em estoque):", buscarProdutoPorId(2));

// ----------------------------------------------------
// 2. CONGELAMENTO HISTÓRICO DE PREÇO
// ----------------------------------------------------
console.log("\n--- 5. Teste de Imutabilidade do Preço Histórico ---");
console.log("Alterando o preço do Teclado no catálogo de R$ 250 para R$ 320...");
atualizarProduto(1, { preco: 320.0 });

console.log("Conferindo se o Pedido #1 da Ana ainda mantém o preço antigo de R$ 250.00:");
console.log(`Preço no Pedido #1: R$ ${pedidoAna?.itens[0].precoUnitario.toFixed(2)} | Preço atual no Catálogo: R$ ${buscarProdutoPorId(1)?.preco.toFixed(2)}`);

// ----------------------------------------------------
// 3. SEGUNDO PEDIDO: Carlos Eduardo (Cliente ID 2)
// ----------------------------------------------------
console.log("\n--- 6. Criando Pedido para Carlos Eduardo (Cliente ID 2) ---");
adicionarAoCarrinho(3, 1); // 1 Monitor
const pedidoCarlos = finalizarPedido(2);
if (pedidoCarlos) {
  exibirDetalhesPedido(pedidoCarlos);
}

// ----------------------------------------------------
// 4. TESTES DE VALIDAÇÕES E CASOS INVÁLIDOS
// ----------------------------------------------------
console.log("\n--- 7. Testes de Situações Inválidas na Finalização ---");

console.log("\n-> Tentativa 1: Finalizar pedido com carrinho vazio:");
finalizarPedido(1);

console.log("\n-> Tentativa 2: Finalizar pedido para cliente inexistente (ID 999):");
adicionarAoCarrinho(4, 1); // Adiciona item no carrinho
finalizarPedido(999);
limparCarrinho();

console.log("\n-> Tentativa 3: Consistência Atômica de Estoque:");
console.log("Adicionando item normal (1 Headset) e item que excede estoque...");
// Monitor tem 7 restantes no estoque (inicial era 8, 1 foi vendido para Carlos)
adicionarAoCarrinho(4, 1); // 1 Headset
// Forçando inserção no carrinho simulando caso de corrida/falta de estoque
// Estoque do monitor é 7, adicionamos 7 e depois tentamos pedir além:
adicionarAoCarrinho(3, 7);
// Simulando que alguém comprou o último monitor por fora, deixando estoque em 6
const monitor = buscarProdutoPorId(3)!;
monitor.estoque = 5; // agora o carrinho pede 7 mas só tem 5!
console.log(`Estoque do Monitor alterado para ${monitor.estoque}, mas o carrinho tem 7.`);

console.log("Tentando finalizar pedido com falha de estoque:");
const pedidoFalha = finalizarPedido(1);
console.log("Resultado do pedido:", pedidoFalha === null ? "CANCELADO COM SUCESSO (Nenhum estoque abatido)" : "ERRO");
console.log("Conferência do estoque do Headset (não deve ter sido descontado):", buscarProdutoPorId(4)?.estoque);

// ----------------------------------------------------
// 5. CONSULTAS DE PEDIDOS
// ----------------------------------------------------
console.log("\n--- 8. Consulta Geral de Pedidos ---");
console.log(`Total de pedidos realizados no sistema: ${listarPedidos().length}`);

console.log("\n--- 9. Consulta de Pedidos da Ana Silva (ID 1) ---");
const pedidosAna = buscarPedidosPorCliente(1);
console.log(`Pedidos encontrados para Ana: ${pedidosAna.length}`);

console.log("\n==================================================");
console.log("Fase 4 executada com sucesso!");
console.log("==================================================");
