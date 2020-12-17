import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/interfaces/todo';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTodoList(): Observable<any>{
    return this.http.get('/todos');
  }

  deleteTask(id: number):Observable<any>{
    return this.http.delete(`/todos/${id}`);
  }

  taskCompleted(id: number, body): Observable<any>{
    return this.http.patch(`/todos/${id}`, body);
  }

  taskDetail(id: number): Observable<any>{
    return this.http.get(`/todo/${id}`);
  }

  updateTask(id: number, body ): Observable<any>{
    return this.http.put(`/todo/${id}`, body);
  }

  createTask(body): Observable<any>{
    return this.http.post('/todos', body);
  }
}
