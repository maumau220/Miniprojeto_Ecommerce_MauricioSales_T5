// ==========================================
// PONTO DE ENTRADA DA APLICAÇÃO (main.ts)
// Mini-Projeto E-commerce - Módulo 1
// ==========================================

import { Produto, Cliente, StatusPedido } from "./types";

console.log("==========================================");
console.log("🛒 SISTEMA DE E-COMMERCE (TypeScript & Node.js)");
console.log("Ambiente configurado com sucesso! (Fase 1)");
console.log("==========================================");

// Verificação básica de tipagem
const statusInicial: StatusPedido = "Pendente";
console.log(`Status de teste inicial: ${statusInicial}`);
