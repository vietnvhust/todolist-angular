import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.class';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public API = 'https://5ff17302db1158001748afd6.mockapi.io/Todos';
  public todos: Todo[] = [];
  constructor(private http: HttpClient) { }
  getAllTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.API);
  }
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.API, todo);
  }
  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.API}/${todo.id}`, todo);
  }
  deleteTodo(id:number): Observable<Todo> {
    return this.http.delete<Todo>(`${this.API}/${id}`);
  }
}
