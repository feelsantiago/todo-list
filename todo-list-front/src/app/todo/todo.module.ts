import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TodoListComponent } from './todo-list/todo-list.component';

import { TodoComponent } from './todo.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
    declarations: [TodoComponent, TodoListComponent],
    providers: [],
    exports: [TodoListComponent],
})
export class TodoModule {}
