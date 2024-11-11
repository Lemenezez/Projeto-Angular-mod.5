import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task;

  inputCheck: FormGroup = new FormGroup({
    checked: new FormControl(false),
  });

  constructor(private taskService: TaskService) {}

  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe({
      next: (response) => {
        console.log('Task editada', response);
      },
      error: (error) => {
        console.error('Erro ao editar task: ', error);
      },
      complete: () => {
        console.log('Task editada com sucesso!');
      },
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: (response) => {
        console.log('Task removida', response);
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
