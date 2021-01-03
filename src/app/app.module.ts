import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    TodoFilterComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
