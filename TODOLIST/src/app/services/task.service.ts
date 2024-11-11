import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://crudcrud.com/api/eb6173731f384ce1a2e6220e8241d577';
  private taskListSource = new BehaviorSubject<Task[]>([]);
  taskList$ = this.taskListSource.asObservable();

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/task`);
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/task/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/task`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/task/${task._id}`, task);  // Usando _id
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/task/${id}`);  // Usando a URL base apiUrl
  }

  updateTaskList() {
    this.getTasks().subscribe({
      next: (tasks) => this.taskListSource.next(tasks),
      error: (error) => console.error('Erro ao atualizar taskList', error),
    });
  }
}
