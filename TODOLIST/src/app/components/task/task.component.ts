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
  isEditing = false;
  isButtonDisabled = false;

  constructor(private taskService: TaskService) {}

  editTask(): void {
    this.isEditing = true;
  }

  saveEdit(task: Task): void {
    this.taskService.updateTask(task).subscribe({
      next: (response) => {
        console.log('Task editada com sucesso', response);
        this.taskService.updateTaskList();
      },
      error: (error) => {
        console.error('Erro ao editar a task:', error);
      },
    });
    this.isEditing = false;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.taskService.updateTaskList();
      },
      error: (error) => {
        console.error('Erro ao deletar task: ', error);
      },
      complete: () => {
        console.log('Task deletada com sucesso!');
      },
    });
  }

  toggleTaskStatus(task: Task): void {
    task.checked = !task.checked;
    this.isButtonDisabled = !this.isButtonDisabled;
  }
}

