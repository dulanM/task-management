import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Task } from "../models/task.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';
  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, { headers : {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmY0NTE4MTA1N2RhNTk5YTY4NGY0MjIiLCJpYXQiOjE3Mjc0MDQxNjMsImV4cCI6MTcyNzQwNzc2M30.W7nZ3R3UuaRH88uv7_1OKoSyG6EA44_PNDLc-O3BbNY`}});
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}