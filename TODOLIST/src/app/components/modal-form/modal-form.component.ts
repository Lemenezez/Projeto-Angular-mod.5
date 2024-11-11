import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css'],
})
export class ModalFormComponent {
  form: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    time: new FormControl(null, [Validators.required]),
    checked: new FormControl(false),
  });

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    this.addTask();
    this.clearForm();
  }

  addTask(): void {
    const payload = this.form.getRawValue();
    this.taskService.addTask(payload).subscribe({
      next: (response) => {
        this.taskService.updateTaskList();
        console.log('Task adicionada com sucesso: ', response);
      },
      error: (error) => {
        console.error('Erro ao adicionar tarefa', error);
      },
    });
  }

  clearForm(): void {
    this.form.reset();
  }
}
