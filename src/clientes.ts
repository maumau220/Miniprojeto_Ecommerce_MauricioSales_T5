// ===================================================================
// MÓDULO DE CLIENTES (clientes.ts)
// Responsável pelo cadastro e consulta de clientes com validações.
// ===================================================================

import { Cliente } from "./types";

// Base de dados em memória inicial com pelo menos 3 clientes pré-cadastrados
export const clientes: Cliente[] = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana.silva@email.com",
  },
  {
    id: 2,
    nome: "Carlos Eduardo",
    email: "carlos.edu@email.com",
  },
  {
    id: 3,
    nome: "Mariana Souza",
    email: "mariana.souza@email.com",
  },
];

// ===================================================================
// FUNÇÕES DE GERENCIAMENTO DE CLIENTES
// ===================================================================

/**
 * Retorna todos os clientes cadastrados.
 */
export function listarClientes(): Cliente[] {
  return clientes;
}

/**
 * Localiza um cliente pelo seu identificador único.
 */
export function buscarClientePorId(id: number): Cliente | undefined {
  return clientes.find((cliente) => cliente.id === id);
}

/**
 * Localiza um cliente pelo endereço de e-mail.
 */
export function buscarClientePorEmail(email: string): Cliente | undefined {
  const emailFormatado = email.trim().toLowerCase();
  return clientes.find(
    (cliente) => cliente.email.toLowerCase() === emailFormatado
  );
}

/**
 * Cadastra um novo cliente aplicando as validações obrigatórias:
 * - Nome informado (não vazio)
 * - E-mail informado (não vazio)
 * - Identificador único
 * - E-mail único
 */
export function cadastrarCliente(novoCliente: Cliente): boolean {
  // 1. Validação de preenchimento do nome
  if (!novoCliente.nome || novoCliente.nome.trim() === "") {
    console.log("[ERRO] O nome do cliente é obrigatório.");
    return false;
  }

  // 2. Validação de preenchimento do e-mail
  if (!novoCliente.email || novoCliente.email.trim() === "") {
    console.log("[ERRO] O e-mail do cliente é obrigatório.");
    return false;
  }

  // 3. Validação de identificador único
  const clientePorId = buscarClientePorId(novoCliente.id);
  if (clientePorId) {
    console.log(`[ERRO] Já existe um cliente com o ID ${novoCliente.id}.`);
    return false;
  }

  // 4. Validação de e-mail único
  const clientePorEmail = buscarClientePorEmail(novoCliente.email);
  if (clientePorEmail) {
    console.log(`[ERRO] O e-mail "${novoCliente.email}" já está cadastrado.`);
    return false;
  }

  // Adiciona à lista de clientes em memória
  clientes.push({
    id: novoCliente.id,
    nome: novoCliente.nome.trim(),
    email: novoCliente.email.trim().toLowerCase(),
  });

  console.log(`[SUCESSO] Cliente "${novoCliente.nome}" cadastrado com sucesso!`);
  return true;
}

