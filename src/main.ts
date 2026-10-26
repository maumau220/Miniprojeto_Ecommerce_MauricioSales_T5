// ===================================================================
// PONTO DE ENTRADA PRINCIPAL (main.ts)
// Demonstração Completa do Sistema de Gerenciamento de E-commerce
// Atende a todos os requisitos do item 3.4 e Sprint 5 da avaliação
// ===================================================================

import {
  listarProdutos,
  buscarProdutoPorId,
  buscarProdutosPorNome,
  filtrarProdutosPorCategoria,
  cadastrarProduto,
} from "./produtos";

import {
  listarClientes,
  cadastrarCliente,
} from "./clientes";

import {
  adicionarAoCarrinho,
  alterarQuantidadeCarrinho,
  removerDoCarrinho,
  exibirResumoCarrinho,
  calcularTotalCarrinho,
  limparCarrinho,
} from "./carrinho";

import {
  finalizarPedido,
  listarPedidos,
  buscarPedidosPorCliente,
  exibirDetalhesPedido,
} from "./pedidos";

import { exibirPainelRelatorios } from "./relatorios";

console.log("===================================================================");
console.log("🚀 MINI-PROJETO AVALIATIVO: SISTEMA DE GERENCIAMENTO DE E-COMMERCE");
console.log("Desenvolvido em TypeScript & Node.js | Back-End Módulo 1");
console.log("Estudante: Maurício Sales - Turma T5");
console.log("===================================================================\n");

// ===================================================================
// 1. CONSULTA E CADASTRO DE PRODUTOS
// ===================================================================
console.log("-------------------------------------------------------------------");
console.log("📦 1. CONSULTA E CADASTRO DE PRODUTOS");
console.log("-------------------------------------------------------------------");

console.log("-> Catálogo inicial de produtos:");
console.table(listarProdutos());

console.log("-> Cadastrando novo produto válido (Webcam Full HD):");
cadastrarProduto({
  id: 6,
  nome: "Webcam Full HD 1080p",
  categoria: "Acessórios",
  preco: 220.0,
  estoque: 14,
});

console.log("\n-> Busca por nome parcial contendo 'Gamer':");
console.log(buscarProdutosPorNome("Gamer"));

console.log("\n-> Filtro por categoria 'Periféricos':");
console.table(filtrarProdutosPorCategoria("Periféricos"));

// ===================================================================
// 2. CONSULTA E CADASTRO DE CLIENTES
// ===================================================================
console.log("\n-------------------------------------------------------------------");
console.log("👤 2. CONSULTA E CADASTRO DE CLIENTES");
console.log("-------------------------------------------------------------------");

console.log("-> Clientes cadastrados inicialmente:");
console.table(listarClientes());

console.log("-> Cadastrando novo cliente (Lucas Pereira):");
cadastrarCliente({
  id: 4,
  nome: "Lucas Pereira",
  email: "lucas.pereira@email.com",
});

// ===================================================================
// 3. OPERAÇÕES DO CARRINHO DE COMPRAS E CÁLCULO DE VALORES
// ===================================================================
console.log("\n-------------------------------------------------------------------");
console.log("🛒 3. GERENCIAMENTO DO CARRINHO DE COMPRAS E CÁLCULO DE VALORES");
console.log("-------------------------------------------------------------------");

console.log("-> Adicionando produtos ao carrinho:");
adicionarAoCarrinho(1, 2); // 2 Teclados Mecânicos (R$ 250 cada)
adicionarAoCarrinho(2, 1); // 1 Mouse Gamer (R$ 120 cada)
adicionarAoCarrinho(1, 1); // Adiciona mais 1 Teclado -> total 3 un (testa acúmulo sem duplicar)

console.log("\n-> Alterando quantidade do Mouse Gamer para 2 unidades:");
alterarQuantidadeCarrinho(2, 2);

console.log("\n-> Adicionando e depois removendo item temporário (Cadeira Ergonômica ID 5):");
adicionarAoCarrinho(5, 1);
removerDoCarrinho(5);

console.log("\n-> Visualização atual do carrinho com subtotais calculados:");
exibirResumoCarrinho();

// ===================================================================
// 4. FINALIZAÇÃO DE PEDIDO E ATUALIZAÇÃO DO ESTOQUE
// ===================================================================
console.log("\n-------------------------------------------------------------------");
console.log("🧾 4. FINALIZAÇÃO DE PEDIDOS E BAIXA NO ESTOQUE");
console.log("-------------------------------------------------------------------");

console.log("-> Estoque ANTES da compra:");
console.log(`Teclado Mecânico (ID 1): ${buscarProdutoPorId(1)?.estoque} un.`);
console.log(`Mouse Gamer (ID 2): ${buscarProdutoPorId(2)?.estoque} un.`);

console.log("\n-> Finalizando pedido da cliente Ana Silva (ID 1):");
const pedidoAna = finalizarPedido(1);

if (pedidoAna) {
  exibirDetalhesPedido(pedidoAna);
}

console.log("\n-> Estoque APÓS a compra (confirmando a baixa):");
console.log(`Teclado Mecânico (ID 1): ${buscarProdutoPorId(1)?.estoque} un. (deduziu 3 un.)`);
console.log(`Mouse Gamer (ID 2): ${buscarProdutoPorId(2)?.estoque} un. (deduziu 2 un.)`);

// Segundo pedido para enriquecer relatórios
console.log("\n-> Realizando uma segunda compra para o cliente Carlos Eduardo (ID 2):");
adicionarAoCarrinho(3, 1); // 1 Monitor 144Hz (R$ 950.00)
adicionarAoCarrinho(6, 2); // 2 Webcams (R$ 220.00 cada = R$ 440.00)
const pedidoCarlos = finalizarPedido(2);
if (pedidoCarlos) {
  exibirDetalhesPedido(pedidoCarlos);
}

// ===================================================================
// 5. DEMONSTRAÇÃO OBRIGATÓRIA DE SITUAÇÕES INVÁLIDAS (Requisito 3.4)
// ===================================================================
console.log("\n-------------------------------------------------------------------");
console.log("⚠️ 5. DEMONSTRAÇÃO DE SITUAÇÕES INVÁLIDAS E REGRAS DE NEGÓCIO");
console.log("-------------------------------------------------------------------");

console.log("\n[TESTE INVÁLIDO 1] Tentativa de cadastrar produto com preço negativo ou zero:");
cadastrarProduto({
  id: 7,
  nome: "Mouse Pad Inválido",
  categoria: "Acessórios",
  preco: -25.0,
  estoque: 10,
});

console.log("\n[TESTE INVÁLIDO 2] Tentativa de adicionar quantidade superior ao estoque:");
// Monitor (ID 3) tinha 8, vendeu 1 para Carlos, restam 7 no estoque
console.log(`Estoque atual do Monitor: ${buscarProdutoPorId(3)?.estoque} un.`);
adicionarAoCarrinho(3, 10); // Tenta colocar 10 un.

console.log("\n[TESTE INVÁLIDO 3] Tentativa de finalizar compra sem itens (carrinho vazio):");
console.log(`Itens no carrinho: ${calcularTotalCarrinho() === 0 ? "Vazio" : "Com itens"}`);
finalizarPedido(1);

console.log("\n[TESTE INVÁLIDO 4 - Extra] Tentativa de finalizar pedido para cliente inexistente:");
adicionarAoCarrinho(4, 1); // Coloca 1 Headset
finalizarPedido(999);      // Cliente ID 999 não existe
limparCarrinho();          // Limpa após o teste

console.log("\n[TESTE INVÁLIDO 5 - Extra] Tentativa de cadastrar cliente com e-mail duplicado:");
cadastrarCliente({
  id: 8,
  nome: "Ana Duplicada",
  email: "ana.silva@email.com",
});

// ===================================================================
// 6. CONSULTAS DE PEDIDOS E HISTÓRICO
// ===================================================================
console.log("\n-------------------------------------------------------------------");
console.log("🔍 6. CONSULTAS DE PEDIDOS REALIZADOS");
console.log("-------------------------------------------------------------------");

console.log(`-> Total de pedidos registrados no sistema: ${listarPedidos().length}`);
console.log("-> Consultando pedidos específicos da cliente Ana Silva (ID 1):");
const pedidosCliente1 = buscarPedidosPorCliente(1);
pedidosCliente1.forEach((p) => {
  console.log(`   - Pedido #${p.id} em ${p.data} | Total: R$ ${p.total.toFixed(2)} | Itens: ${p.itens.length}`);
});

// ===================================================================
// 7. RELATÓRIOS CONSOLIDADOS DO E-COMMERCE
// ===================================================================
console.log("\n-------------------------------------------------------------------");
console.log("📈 7. APRESENTAÇÃO DOS RELATÓRIOS CONSOLIDADOS");
console.log("-------------------------------------------------------------------");

exibirPainelRelatorios();

console.log("\n===================================================================");
console.log("✅ TODAS AS FUNCIONALIDADES E REQUISITOS FORAM EXECUTADOS COM SUCESSO!");
console.log("===================================================================\n");
