import { Component, Input, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  standalone: false,
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!: Task;

  inputCheck: FormGroup = new FormGroup({
    checked: new FormControl(false),
  });

  constructor(private taskService: TaskService) { }

  updateTask(task: Task): void {
    const taskWithId = { ...task, id: task._id };
    this.taskService.updateTask(taskWithId).subscribe({
      next: (updatedTask) => {
        this.taskService.updateTaskList();
        console.log('Task editada', updatedTask);
      },
      error: (error) => {
        console.error('Erro ao editar task: ', error);
      },
      complete: () => {
        console.log('Task editada com sucesso!');
      },
    });
  }

  deleteTask(): void {
    if (this.task && this.task._id) {  // Usando _id para a exclusão
      this.taskService.deleteTask(this.task._id).subscribe({
        next: () => {
          this.taskService.updateTaskList();
        },
        error: (error) => {
          console.error('Erro ao deletar a tarefa: ', error);
        }
      });
    } else {
      console.error('ID da tarefa não encontrado');
    }
  }

  toggleTaskStatus(task: Task): void {
    task.checked = !task.checked;
    console.log(task);
    // Após alternar o status, atualize a tarefa no backend.
    this.updateTask(task);
  }
}
