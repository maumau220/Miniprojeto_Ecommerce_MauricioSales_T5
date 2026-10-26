// ===================================================================
// MÓDULO DE GERENCIAMENTO DE PRODUTOS (produtos.ts)
// Responsável pelo catálogo, estoque e validações de regras de negócio.
// ===================================================================

import { Produto } from "./types";

// Base de dados em memória inicial com produtos pré-cadastrados
export const produtos: Produto[] = [
  {
    id: 1,
    nome: "Teclado Mecânico RGB",
    categoria: "Periféricos",
    preco: 250.0,
    estoque: 15,
  },
  {
    id: 2,
    nome: "Mouse Gamer 16000 DPI",
    categoria: "Periféricos",
    preco: 120.0,
    estoque: 20,
  },
  {
    id: 3,
    nome: "Monitor 24 Polegadas 144Hz",
    categoria: "Eletrônicos",
    preco: 950.0,
    estoque: 8,
  },
  {
    id: 4,
    nome: "Headset Estéreo USB",
    categoria: "Acessórios",
    preco: 180.0,
    estoque: 12,
  },
  {
    id: 5,
    nome: "Cadeira Ergonômica",
    categoria: "Móveis",
    preco: 600.0,
    estoque: 5,
  },
];

// ===================================================================
// FUNÇÕES DE GERENCIAMENTO E CONSULTA
// ===================================================================

/**
 * Retorna todos os produtos cadastrados no catálogo.
 */
export function listarProdutos(): Produto[] {
  return produtos;
}

/**
 * Busca um produto específico através do seu identificador único.
 */
export function buscarProdutoPorId(id: number): Produto | undefined {
  return produtos.find((produto) => produto.id === id);
}

/**
 * Busca produtos cujo nome contenha o termo pesquisado (busca parcial).
 */
export function buscarProdutosPorNome(termo: string): Produto[] {
  const termoFormatado = termo.trim().toLowerCase();
  return produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(termoFormatado)
  );
}

/**
 * Filtra produtos pela categoria informada.
 */
export function filtrarProdutosPorCategoria(categoria: string): Produto[] {
  const categoriaFormatada = categoria.trim().toLowerCase();
  return produtos.filter(
    (produto) => produto.categoria.toLowerCase() === categoriaFormatada
  );
}

/**
 * Cadastra um novo produto aplicando todas as validações obrigatórias:
 * - ID único
 * - Nome preenchido
 * - Preço maior que zero
 * - Estoque não negativo
 */
export function cadastrarProduto(novoProduto: Produto): boolean {
  // 1. Validação de ID único
  const produtoExistente = buscarProdutoPorId(novoProduto.id);
  if (produtoExistente) {
    console.log(`[ERRO] Já existe um produto cadastrado com o ID ${novoProduto.id}.`);
    return false;
  }

  // 2. Validação de nome não vazio
  if (!novoProduto.nome || novoProduto.nome.trim() === "") {
    console.log("[ERRO] O nome do produto não pode ficar em branco.");
    return false;
  }

  // 3. Validação de preço maior que zero
  if (novoProduto.preco <= 0) {
    console.log(`[ERRO] Preço inválido (R$ ${novoProduto.preco.toFixed(2)}). O valor deve ser maior que zero.`);
    return false;
  }

  // 4. Validação de estoque não negativo
  if (novoProduto.estoque < 0) {
    console.log(`[ERRO] Quantidade em estoque inválida (${novoProduto.estoque}). Não pode ser negativa.`);
    return false;
  }

  // Adiciona o produto na lista em memória
  produtos.push(novoProduto);
  console.log(`[SUCESSO] Produto "${novoProduto.nome}" (ID ${novoProduto.id}) cadastrado com sucesso!`);
  return true;
}

/**
 * Atualiza os dados de um produto existente respeitando as validações.
 */
export function atualizarProduto(
  id: number,
  novosDados: {
    nome?: string;
    categoria?: string;
    preco?: number;
    estoque?: number;
  }
): boolean {
  const produto = buscarProdutoPorId(id);

  if (!produto) {
    console.log(`[ERRO] Produto com ID ${id} não foi encontrado para atualização.`);
    return false;
  }

  // Se informou nome, validar se não está vazio
  if (novosDados.nome !== undefined) {
    if (novosDados.nome.trim() === "") {
      console.log("[ERRO] O novo nome do produto não pode ficar em branco.");
      return false;
    }
    produto.nome = novosDados.nome;
  }

  // Se informou preço, validar se > 0
  if (novosDados.preco !== undefined) {
    if (novosDados.preco <= 0) {
      console.log("[ERRO] O novo preço deve ser maior que zero.");
      return false;
    }
    produto.preco = novosDados.preco;
  }

  // Se informou estoque, validar se >= 0
  if (novosDados.estoque !== undefined) {
    if (novosDados.estoque < 0) {
      console.log("[ERRO] O novo estoque não pode ser negativo.");
      return false;
    }
    produto.estoque = novosDados.estoque;
  }

  // Se informou categoria, atualizar
  if (novosDados.categoria !== undefined) {
    produto.categoria = novosDados.categoria;
  }

  console.log(`[SUCESSO] Produto ID ${id} atualizado com sucesso!`);
  return true;
}

/**
 * Remove um produto do catálogo pelo seu identificador.
 */
export function removerProduto(id: number): boolean {
  const indice = produtos.findIndex((p) => p.id === id);

  if (indice === -1) {
    console.log(`[ERRO] Produto com ID ${id} não encontrado para remoção.`);
    return false;
  }

  const [produtoRemovido] = produtos.splice(indice, 1);
  console.log(`[SUCESSO] Produto "${produtoRemovido.nome}" (ID ${id}) removido do catálogo.`);
  return true;
}

