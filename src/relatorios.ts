// ===================================================================
// MÓDULO DE RELATÓRIOS CONSOLIDADOS (relatorios.ts)
// Responsável por métricas, resumos de faturamento e alertas de estoque.
// ===================================================================

import { Produto, Pedido } from "./types";
import { produtos } from "./produtos";
import { pedidos } from "./pedidos";

/**
 * Retorna a lista de produtos que estão com estoque abaixo ou igual a um limite determinado.
 * Utiliza o método de array .filter() conforme trabalhado nas aulas.
 */
export function gerarRelatorioEstoqueBaixo(limite: number = 10): Produto[] {
  return produtos.filter((produto) => produto.estoque <= limite);
}

/**
 * Calcula o faturamento total acumulado de todos os pedidos finalizados.
 * Utiliza o método .reduce() para somar os totais de forma declarativa e concisa.
 */
export function calcularFaturamentoTotal(): number {
  return pedidos.reduce((acumulador, pedido) => acumulador + pedido.total, 0);
}

/**
 * Retorna a quantidade total de itens físicos vendidos em todos os pedidos.
 */
export function calcularTotalItensVendidos(): number {
  return pedidos.reduce((totalGeral, pedido) => {
    const itensDoPedido = pedido.itens.reduce(
      (somaPedido, item) => somaPedido + item.quantidade,
      0
    );
    return totalGeral + itensDoPedido;
  }, 0);
}

/**
 * Exibe no terminal um painel executivo com o resumo das principais métricas do e-commerce.
 */
export function exibirPainelRelatorios(): void {
  const faturamentoTotal = calcularFaturamentoTotal();
  const totalPedidos = pedidos.length;
  const totalItensVendidos = calcularTotalItensVendidos();
  const ticketMedio = totalPedidos > 0 ? faturamentoTotal / totalPedidos : 0;
  const produtosAlerta = gerarRelatorioEstoqueBaixo(10);

  console.log("\n==================================================");
  console.log("📊 PAINEL DE RELATÓRIOS GERENCIAIS DO E-COMMERCE");
  console.log("==================================================");
  console.log(`📦 Total de Pedidos Concluídos : ${totalPedidos}`);
  console.log(`🛍️ Total de Itens Vendidos     : ${totalItensVendidos} unidades`);
  console.log(`💰 Faturamento Bruto Total    : R$ ${faturamentoTotal.toFixed(2)}`);
  console.log(`🎟️ Ticket Médio por Pedido     : R$ ${ticketMedio.toFixed(2)}`);
  console.log("--------------------------------------------------");

  console.log("⚠️ ALERTA: Produtos com Baixo Estoque (Estoque <= 10):");
  if (produtosAlerta.length === 0) {
    console.log("Nenhum produto está com estoque crítico no momento.");
  } else {
    const tabelaAlerta = produtosAlerta.map((p) => ({
      ID: p.id,
      Produto: p.nome,
      Categoria: p.categoria,
      Preço: `R$ ${p.preco.toFixed(2)}`,
      "Estoque Restante": `${p.estoque} un.`,
    }));
    console.table(tabelaAlerta);
  }
  console.log("==================================================");
}

