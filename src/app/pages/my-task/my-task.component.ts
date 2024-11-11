import { TaskListComponent } from './../../components/task-list/task-list.component';
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-my-task',
  standalone: true,
  imports: [
    TaskListComponent,
    CommonModule
  ],
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit, OnDestroy {
  currentDateTime: string = '';
  private timer: any;
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterType: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.updateDateTime();
    this.loadTasks();

    if (isPlatformBrowser(this.platformId)) {
      this.timer = setInterval(() => {
        this.updateDateTime();
      }, 60000);
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  onFilterTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filterType = select.value;
    this.filterTasks();
  }

  filterTasks(): void {
    const dayInput = document.getElementById('filterDay') as HTMLInputElement;
    const monthInput = document.getElementById('filterMonth') as HTMLInputElement;
    const yearInput = document.getElementById('filterYear') as HTMLInputElement;

    const day = dayInput ? (dayInput.value ? parseInt(dayInput.value, 10) : null) : null;
    const month = monthInput ? (monthInput.value ? parseInt(monthInput.value, 10) : null) : null;
    const year = yearInput ? (yearInput.value ? parseInt(yearInput.value, 10) : null) : null;

    this.filteredTasks = this.tasks.filter(task => {
      const taskDate = new Date(task.dueDate);

      const matchesDay = day !== null ? taskDate.getDate() === day : true;
      const matchesMonth = month !== null ? (taskDate.getMonth() + 1) === month : true;
      const matchesYear = year !== null ? taskDate.getFullYear() === year : true;

      return matchesDay && matchesMonth && matchesYear;
    });
  }
}