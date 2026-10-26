// ===================================================================
// MÓDULO DE PEDIDOS (pedidos.ts)
// Responsável pela finalização de compras, controle atômico de estoque,
// histórico imutável de preços e consultas de pedidos.
// ===================================================================

import { Pedido, ItemPedido, StatusPedido } from "./types";
import { buscarClientePorId } from "./clientes";
import { buscarProdutoPorId } from "./produtos";
import { carrinho, limparCarrinho } from "./carrinho";

// Base de dados em memória para armazenar os pedidos finalizados
export const pedidos: Pedido[] = [];

// Contador sequencial para garantir IDs únicos aos pedidos
let proximoPedidoId = 1;

/**
 * Retorna todos os pedidos registrados no sistema.
 */
export function listarPedidos(): Pedido[] {
  return pedidos;
}

/**
 * Busca um pedido específico pelo seu identificador único.
 */
export function buscarPedidoPorId(id: number): Pedido | undefined {
  return pedidos.find((pedido) => pedido.id === id);
}

/**
 * Consulta todos os pedidos realizados por um cliente específico.
 */
export function buscarPedidosPorCliente(clienteId: number): Pedido[] {
  return pedidos.filter((pedido) => pedido.clienteId === clienteId);
}

/**
 * Finaliza a compra transformando os itens do carrinho em um pedido registrado.
 * Regras e Validações Obrigatórias:
 * 1. O carrinho não pode estar vazio.
 * 2. O cliente deve existir no cadastro.
 * 3. Validação Atômica: nenhum item pode ter estoque insuficiente.
 *    Se qualquer item falhar, nenhum estoque é alterado e o pedido é cancelado.
 * 4. Histórico de Preço: o preço unitário praticado na compra é gravado no item.
 * 5. Baixa no estoque apenas após validação de todos os itens.
 * 6. Carrinho é esvaziado após o sucesso.
 */
export function finalizarPedido(clienteId: number): Pedido | null {
  // 1. Validação de cliente cadastrado
  const cliente = buscarClientePorId(clienteId);
  if (!cliente) {
    console.log(`[ERRO] Não é possível finalizar pedido: Cliente com ID ${clienteId} não encontrado.`);
    return null;
  }

  // 2. Validação de carrinho com itens
  if (carrinho.length === 0) {
    console.log("[ERRO] Não é possível finalizar pedido: O carrinho de compras está vazio.");
    return null;
  }

  // 3. Validação Atômica Prévia de Estoque para TODOS os itens
  // Se houver qualquer inconsistência, aborta sem alterar nada.
  for (const item of carrinho) {
    const produto = buscarProdutoPorId(item.produtoId);

    if (!produto) {
      console.log(`[ERRO] Falha de integridade: Produto ID ${item.produtoId} não encontrado no catálogo.`);
      return null;
    }

    if (item.quantidade > produto.estoque) {
      console.log(
        `[ERRO] Falha no pedido: Estoque insuficiente para "${produto.nome}". ` +
        `Disponível: ${produto.estoque}, Requisitado: ${item.quantidade}. O pedido não foi registrado.`
      );
      return null;
    }
  }

  // 4. Preparação dos itens com congelamento do preço histórico de compra
  const itensPedido: ItemPedido[] = [];
  let valorTotalPedido = 0;

  for (const item of carrinho) {
    const produto = buscarProdutoPorId(item.produtoId)!;
    const subtotal = produto.preco * item.quantidade;

    itensPedido.push({
      produtoId: produto.id,
      nome: produto.nome,
      precoUnitario: produto.preco, // Preço congelado no momento da compra
      quantidade: item.quantidade,
      subtotal: subtotal,
    });

    valorTotalPedido += subtotal;
  }

  // 5. Baixa no estoque dos produtos (agora que sabemos que todos os itens são válidos)
  for (const item of carrinho) {
    const produto = buscarProdutoPorId(item.produtoId)!;
    produto.estoque -= item.quantidade;
  }

  // 6. Geração do Pedido
  const novoPedido: Pedido = {
    id: proximoPedidoId++,
    clienteId: cliente.id,
    itens: itensPedido,
    total: valorTotalPedido,
    data: new Date().toLocaleString("pt-BR"),
    status: "Pago",
  };

  // Registra no histórico em memória
  pedidos.push(novoPedido);

  // 7. Esvazia o carrinho de compras
  limparCarrinho();

  console.log(`[SUCESSO] Pedido #${novoPedido.id} registrado com sucesso para ${cliente.nome}! Total: R$ ${novoPedido.total.toFixed(2)}`);
  return novoPedido;
}

/**
 * Exibe de forma organizada os detalhes completos de um pedido no terminal.
 */
export function exibirDetalhesPedido(pedido: Pedido): void {
  const cliente = buscarClientePorId(pedido.clienteId);

  console.log("\n==================================================");
  console.log(`🧾 DETALHES DO PEDIDO #${pedido.id}`);
  console.log(`Cliente: ${cliente ? cliente.nome : "Desconhecido"} (ID: ${pedido.clienteId})`);
  console.log(`Data da Compra: ${pedido.data}`);
  console.log(`Status do Pedido: ${pedido.status}`);
  console.log("--------------------------------------------------");
  console.log("Itens Comprados:");

  const tabelaItens = pedido.itens.map((item) => ({
    Produto: item.nome,
    "Preço Pago": `R$ ${item.precoUnitario.toFixed(2)}`,
    Quantidade: item.quantidade,
    Subtotal: `R$ ${item.subtotal.toFixed(2)}`,
  }));

  console.table(tabelaItens);
  console.log(`VALOR TOTAL DO PEDIDO: R$ ${pedido.total.toFixed(2)}`);
  console.log("==================================================");
}
