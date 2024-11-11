# 📋 Projeto Angular - Todo List

Este é um projeto de aplicação de lista de tarefas (Todo List) construído com Angular, permitindo que os usuários adicionem, visualizem, editem e excluam tarefas. A aplicação utiliza o serviço [CrudCrud](https://crudcrud.com/) como API para operações CRUD, garantindo a persistência dos dados.

## 🗂 Estrutura de Pastas

Abaixo está a estrutura das pastas principais do projeto:

```plaintext
src
├── app
│   ├── components
│   │   ├── footer           # Componente de rodapé da aplicação
│   │   ├── header           # Componente de cabeçalho com título e botão de adicionar tarefa
│   │   ├── list             # Componente que exibe a lista de tarefas
│   │   ├── modal-form       # Componente de modal para criação de novas tarefas
│   │   └── task             # Componente individual de tarefa
│   ├── models
│   │   └── task.model.ts    # Interface que define o modelo da tarefa
│   ├── services
│       └── task.service.ts  # Serviço para gerenciar operações CRUD de tarefas
├── assets                   # Arquivos de imagens e outros recursos estáticos
└── styles                   # Arquivos de estilo globais
```

## 🚀 Funcionalidades

  - Adicionar Tarefa: O usuário pode abrir o modal e adicionar uma nova tarefa, incluindo título, categoria e horário.
  - Listar Tarefas: Exibe todas as tarefas registradas com as informações relevantes.
  - Editar Tarefa: Permite editar o título, categoria e hora de uma tarefa.
  - Excluir Tarefa: Remove uma tarefa da lista.
  - Marcar como Concluída: Permite marcar uma tarefa como concluída através de uma checkbox.

## 📦 Componentes

`app-header`
Exibe o título da aplicação ("Minhas tarefas"), data e horário atuais e um botão para abrir o modal de criação de tarefas.

app-list
Lista todas as tarefas usando o componente app-task para cada item. Exibe uma mensagem quando não há tarefas cadastradas.

app-modal-form
Componente de modal que contém o formulário para criação de uma nova tarefa, com campos de título, categoria e hora.

app-task
Representa uma tarefa individual, exibindo título, categoria e hora, além de permitir marcação como concluída, edição e exclusão.

app-footer
Rodapé da aplicação, exibindo os créditos dos desenvolvedores e os direitos autorais.

📝 Modelos
Task
O modelo Task define a estrutura de uma tarefa:
```bash
export interface Task {
  _id: string;
  title: string;
  category: string;
  time: string;
  checked: boolean;
}
```

🔧 Serviços
TaskService
Serviço que gerencia a comunicação com a API CrudCrud para operações CRUD de tarefas:

getTasks(): Obtém a lista de tarefas.
addTask(task: Task): Adiciona uma nova tarefa.
updateTask(task: Task): Atualiza uma tarefa existente.
deleteTask(id: string): Exclui uma tarefa com base no ID.
🛠️ Instalação e Execução
Para rodar o projeto localmente:

Clone o repositório:
```bash
git clone https://github.com/Lemenezez/Projeto-Angular-mod.5.git
cd Projeto-Angular-mod.5/TODOLIST
```
Instale as dependências:

```bash
npm install
```
Execute o projeto:
```bash
ng serve
```

A aplicação estará disponível em http://localhost:4200.

🛠 Tecnologias Utilizadas
Angular para o desenvolvimento do frontend
Angular CLI para gerenciamento do projeto
Bootstrap para estilização e componentes de UI
CrudCrud como API mock para persistência de dados

👥 Contribuidores
Desenvolvido por:

Gabryel Costa
Leticia Melo
Pedro Cardoso
Vanessa Misiti
Yasmin Silva
© 2024. Todos os direitos reservados.
