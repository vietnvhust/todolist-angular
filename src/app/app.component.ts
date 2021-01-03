import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Todo} from './models/todo.class';
import {TodoService} from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public toggle: boolean = false;
  title = 'todo-crud';
  public subscription: Subscription;
  public todos: Todo[] = [];
  public todoEdit: Todo = null;

  constructor(private todosService: TodoService) {}

  ngOnInit(): void {
    this.getAllToDos();
  }
  getAllToDos(){
    this.subscription = this.todosService.getAllTodos().subscribe(data => {
      this.todos = data;
    });
  }
  onToggleForm(){
    this.toggle = !this.toggle;
    this.todoEdit = null;
  }

  onCloseForm(value){
    this.toggle = value;
  }

  onOpenForm(value){
    this.toggle = true;
  }

  onAddForm(item){
    if(item.status === '0'){
      item.status = false;
    }else {
      item.status = true;
    }
    if(this.todoEdit === null){
      let todo = new Todo(item.title, item.status);
      this.subscription = this.todosService.addTodo(todo).subscribe(data=>{
        this.todos.push(todo);
        this.getAllToDos();
        this.onCloseForm(false);
      });
    }else {
      item.id = this.todoEdit.id;
      this.subscription = this.todosService.updateTodo(item).subscribe(data=>{
        const index = this.todos.findIndex((x) => x.id == this.todoEdit.id);
        this.todos[index].title = item.title;
        this.todos[index].status = item.status;
        this.getAllToDos();
        this.onCloseForm(false);
      });
    }
  }

  onDelete(id){
    this.subscription = this.todosService.deleteTodo(id).subscribe(data=>{
      const index = this.todos.findIndex((x) => x.id === id);
      this.todos.splice(index, 1);
    });
    this.getAllToDos();
  }

  onEdit(todo: Todo){
    this.toggle = true;
    this.todoEdit = todo;
  }

  onSearchTitle(value){
    if(value!=""){
      this.todos = this.todos.filter((obj) =>
        Object.values(obj).some((val) =>
          val
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase())
        )
      );
    }else {
      this.getAllToDos();
    }
  }

  onSort(value){
    if(value==='z-a'){
      this.todos = this.todos.sort((a, b) =>
        a.title > b.title ? -1 : b.title > a.title ? 1 : 0
      );
    }else if(value==='a-z') {
      this.todos = this.todos.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
    }else if(value==='a-s') {
      this.todos = this.todos.sort((a, b) =>
        a.status === b.status ? 0 : a.status ? -1 : 1
      );
    }else if(value==='i-s') {
      this.todos = this.todos.sort((a, b) =>
        a.status === b.status ? 0 : a.status ? 1 : -1
      );
    }else {
      this.getAllToDos();
    }
  }

  onSortStatus(value){
    if(value=='1'){
      this.todos = this.todos.sort((a, b) =>
        a.status === b.status ? 0 : a.status ? -1 : 1
      );
    }else if(value=='0'){
      this.todos = this.todos.sort((a, b) =>
        a.status === b.status ? 0 : a.status ? 1 : -1
      );
    }else {
      this.getAllToDos();
    }
  }

  onChangeStatus(value){
    const index = this.todos.findIndex((x) => x.id == value);
    this.todos[index].status = !this.todos[index].status
    this.subscription = this.todosService.updateTodo(this.todos[index]).subscribe(data=>{
      this.getAllToDos();
    });
  }
}
