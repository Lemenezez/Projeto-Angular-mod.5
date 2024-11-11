import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://crudcrud.com/api/6597be16f1e74567be0de46d488721b2';
  private taskListSource = new BehaviorSubject<Task[]>([]);
  taskList$ = this.taskListSource.asObservable();

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/task`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/task`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/task/${task._id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/task/${id}`).pipe(
      tap(() => {
        const currentTasks = this.taskListSource.value;
        this.taskListSource.next(
          currentTasks.filter((task) => task._id !== id)
        );
      })
    );
  }

  updateTaskList() {
    this.getTasks().subscribe({
      next: (tasks) => {
        this.taskListSource.next(tasks);
      },
      error: (error) => console.error('Erro ao atualizar taskList', error),
    });
  }
}
