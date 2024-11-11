import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    if (!this.tasks.length) {
      this.loadTasks();
    }
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onTaskSaved(task: Task): void {
    this.tasks.push(task);
  }

  onTaskDeleted(taskId: string): void {
    this.tasks = this.tasks.filter(task => task._id !== taskId);
  }

  onTaskUpdated(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task._id === updatedTask._id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }
}