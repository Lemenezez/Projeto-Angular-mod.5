import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = '/api/tasks';
  private tasks: Task[] | null = null;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    if (this.tasks) {
      return of(this.tasks);
    } else {
      return this.http.get<Task[]>(this.apiUrl).pipe(
        tap(tasks => this.tasks = tasks)
      );
    }
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    task.completed = false;
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(newTask => {
        if (this.tasks) {
          this.tasks.push(newTask);
        }
      })
    );
  }

  updateTask(task: Task): Observable<Task> {
    const taskId = task._id;
    return this.http.put<Task>(`${this.apiUrl}/${taskId}`, task).pipe(
      tap(updatedTask => {
        if (this.tasks) {
          const index = this.tasks.findIndex(t => t._id === updatedTask._id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
        }
      })
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        if (this.tasks) {
          this.tasks = this.tasks.filter(task => task._id !== id);
        }
      })
    );
  }
}