# 🧪 Teste Técnico — Vaga de Desenvolvedor Front-end React

Este projeto consiste na solução para o desafio técnico da vaga de Desenvolvedor Front-end React.
O objetivo foi criar uma aplicação que simula um sistema de gestão de tarefas com estilo **Kanban**, semelhante ao Trello.

---

## 🚀 Objetivo

Desenvolver uma página de **gestão de tarefas** com as seguintes funcionalidades:

- ✅ Visualização de tarefas organizadas em **colunas (etapas)** do processo:
  - **Ideias**
  - **A Fazer**
  - **Fazendo**
  - **Feito**
- ✅ Funcionalidade de **drag and drop** para mover os cards entre colunas.
- ✅ Scroll horizontal para melhor visualização em telas menores.
- ✅ Botão **"Criar Tarefa"** que abre uma **modal com formulário** para cadastrar nova tarefa.
- ✅ Validação de todos os campos do formulário antes da criação da tarefa.
- ✅ Exibição dos dados da tarefa em uma **modal de visualização** ao clicar em um card.
- ✅ Dados da visualização obtidos via **API GET**:
- ✅ Exibição de **loading** na modal enquanto os dados são carregados.
- ✅ Componente de **TaskCard documentado via Storybook** (Diferencial).

---

## 🧱 Tecnologias Utilizadas

- **React + TypeScript** + **Vite** — estrutura principal da aplicação;
- **Zustand** — gerenciamento de estado;
- **TailwindCSS + ShadCN UI** — estilização + biblioteca de componentes;
- **@dnd-kit** — biblioteca para drag and drop;
- **Storybook** — documentação e visualização de componentes;
- **ESLint + Prettier** — padronização e qualidade de código;

---

## ▶️ Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/MateusGutierrez/test-recrutei-front-end.git
cd test-recrutei-front-end/app
```
### 2. Instale as dependências

```bash
npm install
```

### 3. Run

```bash
npm run dev
```
