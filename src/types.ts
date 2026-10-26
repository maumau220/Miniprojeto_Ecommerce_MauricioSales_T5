// ==========================================
// DEFINIÇÃO DOS TIPOS CENTRAIS DO SISTEMA
// Mini-Projeto E-commerce - Módulo 1 (Node.js & TypeScript)
// ==========================================

// Union Type para categorias de produtos comuns
export type CategoriaProduto = 
  | "Eletrônicos"
  | "Periféricos"
  | "Acessórios"
  | "Móveis";

// Tipo para representar um Produto no catálogo
export type Produto = {
  id: number;
  nome: string;
  categoria: CategoriaProduto | string;
  preco: number;
  estoque: number;
};

// Tipo para representar um Cliente
export type Cliente = {
  id: number;
  nome: string;
  email: string;
};

// Tipo para um item armazenado dentro do Carrinho de Compras
export type ItemCarrinho = {
  produtoId: number;
  quantidade: number;
};

// Union Type para o status de um pedido (visto em aula)
export type StatusPedido = "Pendente" | "Pago" | "Cancelado";

// Tipo para registrar o item no pedido com o preço histórico congelado
export type ItemPedido = {
  produtoId: number;
  nome: string;
  precoUnitario: number;
  quantidade: number;
  subtotal: number;
};

// Tipo para representar o Pedido finalizado
export type Pedido = {
  id: number;
  clienteId: number;
  itens: ItemPedido[];
  total: number;
  data: string;
  status: StatusPedido;
};

// Exemplo didático de Tupla conforme ensinado em aula: [idPedido, total, quantidadeItens]
export type ResumoPedidoTupla = [number, number, number];

