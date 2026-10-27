# 🛒 Sistema de Gerenciamento de E-commerce com TypeScript

> **Mini-Projeto Avaliativo – Módulo 1 (Semana 07)**  
> **Curso:** Desenvolvedor Back-End Node  
> **Turma:** T5 – Módulo 1  
> **Estudante:** Maurício Sales  
> **Repositório:** `Miniprojeto_Ecommerce_MauricioSales_T5`

---

## 📌 1. Objetivo da Aplicação

Desenvolver a lógica central de back-end de um sistema de gerenciamento de e-commerce utilizando **TypeScript** executado em ambiente **Node.js**. 

A aplicação organiza dados por meio de tipos explícitos, modularização limpa (`import`/`export`), arrays em memória e funções reutilizáveis, garantindo consistência operacional no controle de catálogo, clientes, carrinho de compras, fechamento de pedidos e consolidação de relatórios.

O foco reside na construção da lógica de negócio e na arquitetura do código sem a necessidade de banco de dados externo ou interfaces visuais.

---

## 🚀 2. Tecnologias Utilizadas

- **Node.js** (v24.18.0) – Runtime JavaScript assíncrono para execução do código compilado.
- **TypeScript** (v5.4+) – Superconjunto tipado de JavaScript para prevenção de erros em tempo de compilação.
- **Git & GitHub** – Controle de versão distribuído com commits semânticos por sprints.
- **NPM** – Gerenciador de pacotes e scripts de automação (`build`, `start`).

---

## 📂 3. Estrutura de Arquivos e Módulos

O projeto adota a separação recomendada entre código-fonte (`src/`) e arquivos compilados (`dist/`):

```text
miniprojeto-ecommerce/
├── dist/                              # Código JavaScript compilado (ignorado no Git)
├── node_modules/                      # Dependências de desenvolvimento (ignorado no Git)
├── src/                               # Código-fonte TypeScript
│   ├── types.ts                       # Modelos de dados, Union Types e Tuplas
│   ├── produtos.ts                    # Catálogo, validações e controle de estoque
│   ├── clientes.ts                    # Cadastro, consulta e validações de clientes
│   ├── carrinho.ts                    # Adição, remoção, alteração e subtotais
│   ├── pedidos.ts                     # Fechamento atômico, imutabilidade e consultas
│   ├── relatorios.ts                  # Consolidação financeira e alerta de estoque
│   └── main.ts                        # Ponto de entrada e script de demonstração
├── .gitignore                         # Regras de exclusão do Git
├── KANBAN.md                          # Painel de acompanhamento das Sprints e documentação
├── package.json                       # Configuração de scripts e dependências
├── tsconfig.json                      # Configurações do compilador TypeScript
└── README.md                          # Documentação completa do projeto
```

---

## ⚙️ 4. Instruções de Compilação e Execução

### Pré-requisitos
- Node.js instalado na máquina.
- Git para clonagem do repositório.

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/maumau220/Miniprojeto_Ecommerce_MauricioSales_T5.git
   cd "Mini Projeto Módulo 1"
   ```

2. **Instalar as dependências de desenvolvimento:**
   ```bash
   npm install
   ```

3. **Compilar o código TypeScript para JavaScript:**
   ```bash
   npm run build
   ```
   *(Os arquivos `.js` serão gerados na pasta `./dist` conforme configurado no `tsconfig.json`)*.

4. **Executar a aplicação compilada:**
   ```bash
   npm start
   ```
   *(Executa `node dist/main.js`, exibindo o roteiro demonstrativo completo no terminal)*.

---

## 🧩 5. Funcionalidades Implementadas

### A. Cadastro e Gerenciamento de Produtos (`src/produtos.ts`)
- Listagem geral de produtos do catálogo.
- Busca de produto por identificador único (`id`).
- Busca de produtos por nome parcial (ex: `'Gamer'`).
- Filtro de produtos por categoria exata (ex: `'Periféricos'`).
- Cadastro de novos produtos com validação de regras de negócio.
- Atualização e remoção de produtos cadastrados.

### B. Cadastro e Consulta de Clientes (`src/clientes.ts`)
- Inicialização com 3 clientes pré-cadastrados.
- Listagem geral de clientes.
- Busca de cliente por identificador e por e-mail.
- Cadastro de novos clientes com validação de unicidade e obrigatoriedade de campos.

### C. Gerenciamento do Carrinho de Compras (`src/carrinho.ts`)
- Adição de produtos com verificação prévia de estoque.
- Acúmulo de quantidade para produtos já presentes (sem duplicação de linhas).
- Alteração da quantidade de itens com validação contra o estoque disponível.
- Remoção individual de itens e limpeza geral do carrinho.
- Cálculo automático do subtotal por item (`preço × quantidade`).
- Cálculo automático do valor total do carrinho via `.reduce()`.

### D. Finalização e Histórico de Pedidos (`src/pedidos.ts`)
- Transformação do carrinho em um pedido registrado com identificador único.
- **Congelamento histórico de preços:** os itens do pedido gravam o preço exato praticado no momento da venda, tornando-o imutável frente a alterações posteriores no catálogo.
- **Consistência atômica:** o pedido valida previamente todo o carrinho; se um único item falhar, nenhum estoque é deduzido e o pedido é cancelado.
- Baixa real de estoque no catálogo apenas após confirmação total.
- Esvaziamento automático do carrinho após o pedido.
- Consulta geral de pedidos e histórico filtrado por cliente.

### E. Relatórios Gerenciais Consolidados (`src/relatorios.ts`)
- Alerta de produtos com baixo estoque ($\le 10$ unidades).
- Total de pedidos finalizados e volume de itens físicos vendidos.
- Faturamento financeiro bruto acumulado.
- Ticket médio por pedido.

---

## 🛡️ 6. Regras de Negócio e Validações Implementadas

| Entidade | Regra / Validação | Comportamento do Sistema |
| :--- | :--- | :--- |
| **Produtos** | Identificador único | Impede o cadastro de produtos com IDs duplicados. |
| **Produtos** | Nome não vazio | Bloqueia cadastros com nomes nulos ou preenchidos apenas com espaços. |
| **Produtos** | Preço positivo | Exige valor estritamente maior que zero (`preco > 0`). |
| **Produtos** | Estoque não negativo | Impede quantidades em estoque menores que zero (`estoque >= 0`). |
| **Clientes** | Campos obrigatórios | Exige preenchimento obrigatório de nome e e-mail. |
| **Clientes** | Unicidade | Bloqueia novos clientes com ID ou e-mail já cadastrados. |
| **Carrinho** | Quantidade válida | Rejeita quantidades menores ou iguais a zero. |
| **Carrinho** | Existência do produto | Bloqueia a inserção de produtos inexistentes no catálogo. |
| **Carrinho** | Limite de estoque | Impede adicionar quantidade maior que o estoque em tempo real. |
| **Pedidos** | Carrinho preenchido | Bloqueia a finalização de compras com carrinho vazio. |
| **Pedidos** | Cliente válido | Rejeita pedidos associados a clientes não encontrados. |
| **Pedidos** | Atômico / Estoque | Cancela a compra integral caso qualquer item falte no estoque. |
| **Pedidos** | Imutabilidade | Preserva o preço de compra inalterado para auditoria futura. |

---

## 🧪 7. Demonstração de Funcionamento (`src/main.ts`)

O arquivo principal executa um fluxo completo e atende à exigência de **testar no mínimo três situações inválidas**:

```text
===================================================================
🚀 MINI-PROJETO AVALIATIVO: SISTEMA DE GERENCIAMENTO DE E-COMMERCE
Desenvolvido em TypeScript & Node.js | Back-End Módulo 1
Estudante: Maurício Sales - Turma T5
===================================================================

[Fluxo Comercial de Sucesso]
✓ Listagem de catálogo e clientes iniciais
✓ Cadastro de novos produtos e novos clientes
✓ Inserção e alteração de produtos no carrinho
✓ Finalização de Pedido #1 (Cliente Ana Silva) -> R$ 990.00
✓ Finalização de Pedido #2 (Cliente Carlos Eduardo) -> R$ 1390.00
✓ Conferência da redução de estoque em tempo real
✓ Preservação histórica dos valores em compras passadas

[Demonstração de Situações Inválidas Obrigatórias]
🚫 Teste Inválido 1: Tentativa de cadastrar produto com preço negativo (R$ -25.00) -> Recusado
🚫 Teste Inválido 2: Tentativa de adicionar quantidade superior ao estoque (10 un. de 7) -> Recusado
🚫 Teste Inválido 3: Tentativa de finalizar pedido com carrinho vazio -> Recusado
🚫 Teste Inválido 4: Tentativa de compra para cliente inexistente (ID 999) -> Recusado
🚫 Teste Inválido 5: Tentativa de cliente com e-mail duplicado -> Recusado

[Painel de Relatórios Consolidados]
📦 Total de Pedidos Concluídos : 2
🛍️ Total de Itens Vendidos     : 8 unidades
💰 Faturamento Bruto Total    : R$ 2380.00
🎟️ Ticket Médio por Pedido     : R$ 1190.00
⚠️ Alerta de Estoque Baixo     : Monitor 24" (7 un.), Cadeira Ergonômica (5 un.)
```

---

## ⚠️ 8. Limitações Conhecidas do Sistema

1. **Persistência em Memória Volátil:** Os dados permanecem armazenados apenas durante a execução do script no Node.js; ao reiniciar o processo, as variáveis voltam aos estados iniciais (sem banco de dados ou arquivos em disco, conforme escopo educacional).
2. **Ambiente Single-User / Console:** Não possui interface visual web (HTML/CSS) ou camada de transporte HTTP (APIs REST com Express).
3. **Mecanismo de Pagamento Simulado:** Não há conexão externa com gateways bancários ou cartões de crédito; o status é fixado em `"Pago"` após validação com sucesso.

