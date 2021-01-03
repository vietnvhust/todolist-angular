import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Todo} from '../../models/todo.class';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit, OnChanges {

  @Output('toggleFalse') toggleFalse = new EventEmitter<boolean>();
  @Output('addTodo') addTodo = new EventEmitter<Todo>();
  @Input('todoEdit') todoEdit: Todo = null;

  public title: string = "";
  public status: boolean = false;
  public formdata: FormGroup;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.title = changes.todoEdit.currentValue != undefined ? changes.todoEdit.currentValue.title:'';
    this.status = changes.todoEdit.currentValue != undefined ? changes.todoEdit.currentValue.status:false;
  }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      title: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ])),
      status: new FormControl("0")
    });
    if (this.todoEdit!=null && this.todoEdit.id!=undefined){
      this.formdata.patchValue(this.todoEdit);
    }
  }

  onCloseForm() {
    this.toggleFalse.emit(false);
    this.title = '';
    this.status = false;
  }

  onResetForm(){
    this.onCloseForm();
  }

  onClickSubmit(data){
    this.addTodo.emit(data);
  }

}
