import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup;
  isSubmitting = false;
  isEditing: boolean;
  taskId: string | undefined;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {
    this.isEditing = !!data?.task;
    this.taskId = data?.task?._id;
    this.taskForm = this.fb.group({
      title: [data?.task?.title || '', Validators.required],
      category: [data?.task?.category || '', Validators.required],
      description: [data?.task?.description || '', Validators.required],
      dueDate: [data?.task ? this.formatDate(data.task.dueDate) : '', Validators.required],
      dueTime: [data?.task ? this.formatTime(data.task.dueDate) : '', Validators.required],
      completed: [data?.task?.completed || false]
    });
  }

  ngOnInit(): void {}

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toTimeString().split(' ')[0].substring(0, 5);
  }

  onSubmit(): void {
    if (this.taskForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const { dueTime, ...taskData } = this.taskForm.value;

      const task: Task = {
        ...taskData,
        _id: this.taskId,
        dueDate: `${this.taskForm.value.dueDate}T${dueTime}:00.000Z`,
        dueTime: dueTime,
        completed: this.taskForm.value.completed
      };

      if (task._id) {
        this.taskService.updateTask(task).subscribe(() => {
          this.dialogRef.close(task);
        }, () => {
          this.isSubmitting = false;
        });
      } else {
        this.taskService.addTask(task).subscribe(newTask => {
          this.dialogRef.close(newTask);
        }, () => {
          this.isSubmitting = false;
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}