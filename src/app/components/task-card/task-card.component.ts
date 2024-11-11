import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() taskDeleted = new EventEmitter<string>();
  @Output() taskUpdated = new EventEmitter<Task>();

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  deleteTask(): void {
    if (this.task._id) {
      this.taskService.deleteTask(this.task._id).subscribe(() => {
        this.taskDeleted.emit(this.task._id);
      });
    }
  }

  editTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '800px',
      data: { task: this.task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result._id) {
        this.taskService.updateTask(result).subscribe(
          updatedTask => {
            this.taskUpdated.emit(updatedTask);
          },
          error => {
            console.error("Erro ao atualizar a tarefa:", error);
          }
        );
      } else {
        console.error("ID da tarefa não foi definido ou tarefa foi cancelada.");
      }
    });
  }

  toggleCompleted(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe(
      updatedTask => {
        this.taskUpdated.emit(updatedTask);
      },
      error => {
        console.error("Erro ao atualizar a tarefa:", error);
      }
    );
  }
}