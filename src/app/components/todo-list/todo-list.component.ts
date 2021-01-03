import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todo.class';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input('todos') todos : Todo[] = [];
  @Output('idDelete') idDelete = new EventEmitter<number>();
  @Output('idEdit') idEdit = new EventEmitter<Todo>();
  @Output('toggleTrue') toggleTrue = new EventEmitter<boolean>();
  @Output('title') onHandleTitle = new EventEmitter<string>();
  @Output('status') onHandleStatus = new EventEmitter<string>();
  @Output('statusChange') onHandleStatusChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {

  }

  onDelete(id){
    this.idDelete.emit(parseInt(id));
  }

  onEdit(todo: Todo){
    this.toggleTrue.emit(true);
    this.idEdit.emit(todo);
  }

  onSearchTitle(value){
    this.onHandleTitle.emit(value)
  }

  onChangeStatus(value){
    this.onHandleStatus.emit(value)
  }

  onStatus(value){
    this.onHandleStatusChange.emit(value)
  }
}
