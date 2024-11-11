import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task;
  isEditing = false; // Controle para alternar entre edição e visualização

  constructor(private taskService: TaskService) {}

  // Função para ativar o modo de edição
  editTask(): void {
    this.isEditing = true;
  }

  // Função para salvar a tarefa editada
  saveEdit(task: Task): void {
    this.taskService.updateTask(task).subscribe({
      next: (response) => {
        console.log('Task editada com sucesso', response);
        this.isEditing = false; // Sai do modo de edição
        this.taskService.updateTaskList(); // Atualiza a lista de tarefas
      },
      error: (error) => {
        console.error('Erro ao editar a task:', error);
      },
    });
  }

  // Função para cancelar a edição e voltar ao estado inicial
  cancelEdit(): void {
    this.isEditing = false;
  }

  // Função para deletar a tarefa
  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: (response) => {
        console.log('Task removida', response);
        this.taskService.updateTaskList(); // Atualiza a lista após a exclusão
      },
      error: (error) => {
        console.error('Erro ao deletar task: ', error);
      },
      complete: () => {
        console.log('Task deletada com sucesso!');
      },
    });
  }

  toggleTaskStatus(task: Task) {
    task.checked = !task.checked;
    console.log(task);
  }
}
