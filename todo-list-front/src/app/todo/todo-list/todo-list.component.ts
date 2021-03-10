import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../types/todo';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
    @Input()
    public project: string;

    @Input()
    public todos: Todo[];

    @Output()
    public onTodoChange = new EventEmitter<Todo>();

    @Output()
    public onTodoRemoved = new EventEmitter<Todo>();

    public ngOnInit(): void {}

    public onTodoCompleted(todo: Todo): void {
        this.onTodoChange.emit(todo);
    }

    public onTodoEdited(todo: Todo): void {
        this.onTodoChange.emit(todo);
    }

    public onTodoDeleted(todo: Todo): void {
        this.onTodoRemoved.emit(todo);
    }
}
