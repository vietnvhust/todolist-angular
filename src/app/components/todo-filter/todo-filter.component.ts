import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent implements OnInit {
  public title: string = "";
  public sort: string = "a-z";
  constructor() { }
  @Output('title') onHandleTitle = new EventEmitter<string>();
  @Output('sort') onHandleSort = new EventEmitter<string>();
  ngOnInit(): void {
  }
  onSearchTitle(title){
    this.title = title;
    this.onHandleTitle.emit(this.title);
  }
  onSort(sort){
    this.sort = sort;
    this.onHandleSort.emit(this.sort);
  }
}
