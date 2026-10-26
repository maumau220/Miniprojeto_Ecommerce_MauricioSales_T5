// ===================================================================
// MÓDULO DO CARRINHO DE COMPRAS (carrinho.ts)
// Responsável pela seleção de itens, controle de quantidades e cálculos.
// ===================================================================

import { ItemCarrinho } from "./types";
import { buscarProdutoPorId } from "./produtos";

// Armazenamento em memória dos itens no carrinho
export let carrinho: ItemCarrinho[] = [];

/**
 * Retorna todos os itens atuais do carrinho.
 */
export function listarCarrinho(): ItemCarrinho[] {
  return carrinho;
}

/**
 * Esvazia todos os itens do carrinho de compras.
 */
export function limparCarrinho(): void {
  carrinho = [];
}

/**
 * Adiciona um produto ao carrinho ou atualiza sua quantidade se já existir.
 * Validações obrigatórias:
 * - Quantidade maior que zero.
 * - Produto deve existir no catálogo.
 * - Quantidade total solicitada não pode exceder o estoque disponível.
 */
export function adicionarAoCarrinho(produtoId: number, quantidade: number): boolean {
  // 1. Validação de quantidade positiva
  if (quantidade <= 0) {
    console.log(`[ERRO] Quantidade inválida (${quantidade}). Informe uma quantidade maior que zero.`);
    return false;
  }

  // 2. Validação de existência do produto
  const produto = buscarProdutoPorId(produtoId);
  if (!produto) {
    console.log(`[ERRO] Produto com ID ${produtoId} não foi encontrado no catálogo.`);
    return false;
  }

  // Verifica se o item já está no carrinho
  const itemExistente = carrinho.find((item) => item.produtoId === produtoId);
  const quantidadeJaNoCarrinho = itemExistente ? itemExistente.quantidade : 0;
  const quantidadeTotalDesejada = quantidadeJaNoCarrinho + quantidade;

  // 3. Validação de estoque disponível
  if (quantidadeTotalDesejada > produto.estoque) {
    console.log(
      `[ERRO] Estoque insuficiente para o produto "${produto.nome}". ` +
      `Disponível: ${produto.estoque}, Solicitado no carrinho: ${quantidadeTotalDesejada}.`
    );
    return false;
  }

  // Se já existe no carrinho, atualiza a quantidade somando a nova
  if (itemExistente) {
    itemExistente.quantidade = quantidadeTotalDesejada;
    console.log(`[SUCESSO] Quantidade do produto "${produto.nome}" atualizada no carrinho para ${itemExistente.quantidade} un.`);
  } else {
    // Caso contrário, insere uma nova linha no carrinho
    carrinho.push({ produtoId, quantidade });
    console.log(`[SUCESSO] Produto "${produto.nome}" (${quantidade} un.) adicionado ao carrinho.`);
  }

  return true;
}

/**
 * Remove completamente um produto do carrinho de compras.
 */
export function removerDoCarrinho(produtoId: number): boolean {
  const indice = carrinho.findIndex((item) => item.produtoId === produtoId);

  if (indice === -1) {
    console.log(`[ERRO] O produto com ID ${produtoId} não está presente no carrinho.`);
    return false;
  }

  carrinho.splice(indice, 1);
  console.log(`[SUCESSO] Produto ID ${produtoId} removido do carrinho.`);
  return true;
}

/**
 * Altera a quantidade exata de um produto que já está no carrinho.
 */
export function alterarQuantidadeCarrinho(produtoId: number, novaQuantidade: number): boolean {
  // 1. Validação de quantidade
  if (novaQuantidade <= 0) {
    console.log(`[ERRO] A nova quantidade deve ser maior que zero.`);
    return false;
  }

  // 2. Localiza o item no carrinho
  const item = carrinho.find((i) => i.produtoId === produtoId);
  if (!item) {
    console.log(`[ERRO] Produto com ID ${produtoId} não encontrado no carrinho.`);
    return false;
  }

  // 3. Validação com o estoque do produto
  const produto = buscarProdutoPorId(produtoId);
  if (!produto) {
    console.log(`[ERRO] Produto não encontrado no catálogo.`);
    return false;
  }

  if (novaQuantidade > produto.estoque) {
    console.log(
      `[ERRO] Não é possível alterar para ${novaQuantidade} un. Estoque disponível: ${produto.estoque}.`
    );
    return false;
  }

  item.quantidade = novaQuantidade;
  console.log(`[SUCESSO] Quantidade de "${produto.nome}" alterada para ${novaQuantidade} un.`);
  return true;
}

/**
 * Calcula o subtotal de um item do carrinho (Preço Unitário x Quantidade).
 */
export function calcularSubtotalItem(item: ItemCarrinho): number {
  const produto = buscarProdutoPorId(item.produtoId);
  if (!produto) {
    return 0;
  }
  return produto.preco * item.quantidade;
}

/**
 * Calcula o valor total de todos os itens presentes no carrinho.
 */
export function calcularTotalCarrinho(): number {
  return carrinho.reduce((total, item) => {
    return total + calcularSubtotalItem(item);
  }, 0);
}

/**
 * Exibe de forma formatada os itens do carrinho com seus respectivos subtotais e o total final.
 */
export function exibirResumoCarrinho(): void {
  if (carrinho.length === 0) {
    console.log("O carrinho de compras está vazio.");
    return;
  }

  console.log("\n--- Itens no Carrinho de Compras ---");
  const tabelaItens = carrinho.map((item) => {
    const produto = buscarProdutoPorId(item.produtoId);
    const precoUnitario = produto ? produto.preco : 0;
    const subtotal = calcularSubtotalItem(item);

    return {
      ID: item.produtoId,
      Produto: produto ? produto.nome : "Desconhecido",
      "Preço Unitário": `R$ ${precoUnitario.toFixed(2)}`,
      Quantidade: item.quantidade,
      Subtotal: `R$ ${subtotal.toFixed(2)}`,
    };
  });

  console.table(tabelaItens);
  console.log(`Valor Total do Carrinho: R$ ${calcularTotalCarrinho().toFixed(2)}`);
}

