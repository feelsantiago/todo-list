import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from './todo.service';
import { Todo, TodoUpdateRequest } from './types/todo';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
    @Input()
    public project: string;

    @Input()
    public todo: Todo;

    @Output()
    public onCompleted = new EventEmitter<Todo>();

    @Output()
    public onEdited = new EventEmitter<Todo>();

    @Output()
    public onDeleted = new EventEmitter<Todo>();

    public todoForm: FormGroup;

    public isMouseHovering = false;

    public editMode = false;

    constructor(private readonly fb: FormBuilder, private readonly todoService: TodoService) {}

    public ngOnInit(): void {}

    public onChecked(): void {
        this.todoService.complete(this.todo._id, this.project).subscribe((todo) => {
            this.todo.completed = todo.completed;
            this.onCompleted.emit(todo);
        });
    }

    public onSubmitted(): void {
        const body = this.todoForm.value as TodoUpdateRequest;
        this.todoService.updateDescription(this.todo._id, this.project, body).subscribe((todo) => {
            this.todo.description = todo.description;
            this.onEdited.emit(todo);
            this.editMode = false;
        });
    }

    public onDelete(): void {
        this.todoService.delete(this.todo._id, this.project).subscribe(() => this.onDeleted.emit(this.todo));
    }

    public onEdit(status: boolean): void {
        this.editMode = status;

        if (this.editMode) {
            this.todoForm = this.fb.group({
                description: [this.todo.description, Validators.required],
            });
        }
    }

    public onMouseHover(status: boolean): void {
        this.isMouseHovering = status;
    }
}
