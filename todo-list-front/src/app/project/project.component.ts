import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, Observable, Subject } from 'rxjs';
import { filter, map, repeatWhen, toArray } from 'rxjs/operators';
import { TodoService } from '../todo/todo.service';
import { Todo, TodoCreateRequest } from '../todo/types/todo';
import { ProjectService } from './project.service';
import { Project, ProjectEditRequest } from './types/project';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
    @Input()
    public project: Project;

    @Output()
    public onUpdated = new EventEmitter<Project>();

    @Output()
    public onDeleted = new EventEmitter<Project>();

    public editMode = false;

    public projectForm: FormGroup;

    public todoForm: FormGroup;

    public toDo$: Observable<Todo[]>;

    public done$: Observable<Todo[]>;

    private todoChanges = new Subject<void>();

    constructor(
        private readonly fb: FormBuilder,
        private readonly projectService: ProjectService,
        private readonly todoService: TodoService,
    ) {}

    public ngOnInit(): void {
        this.initFilters();

        this.todoForm = this.fb.group({
            description: ['', Validators.required],
        });
    }

    public onEdit(status: boolean): void {
        this.editMode = status;

        if (this.editMode) {
            this.projectForm = this.fb.group({
                name: [this.project.name, Validators.required],
            });
        }
    }

    public onProjectSubmitted(): void {
        const body = this.projectForm.value as ProjectEditRequest;
        this.projectService.update(this.project._id, body).subscribe((project) => {
            this.project.name = project.name;
            this.onUpdated.emit(project);
            this.editMode = false;
        });
    }

    public onProjectDeleted(): void {
        this.projectService.delete(this.project._id).subscribe((status) => {
            this.project.isDeleted = status;
            this.onDeleted.emit(this.project);
        });
    }

    public onTodoSubmitted(): void {
        const body = this.todoForm.value as TodoCreateRequest;

        this.todoService.createNewTodoForProject(this.project._id, body).subscribe((todo) => {
            this.project.todos.push(todo);
            this.todoChanges.next();
            this.todoForm.reset();
        });
    }

    public onTodoChange(_todo: Todo): void {
        this.todoChanges.next();
    }

    public onTodoRemoved(todo: Todo): void {
        this.project.todos = this.project.todos.filter((old) => old._id !== todo._id);
        this.todoChanges.next();
    }

    private initFilters(): void {
        const todos$ = from(this.project.todos);

        this.toDo$ = todos$.pipe(
            filter((todo) => !todo.completed),
            toArray(),
            repeatWhen(() => this.todoChanges.asObservable()),
        );

        this.done$ = todos$.pipe(
            filter((todo) => todo.completed),
            toArray(),
            map((todos) => todos.sort((a, b) => this.sortByDate(a.finishDate, b.finishDate))),
            repeatWhen(() => this.todoChanges.asObservable()),
        );
    }

    private sortByDate(dateA: Date, dateB: Date): number {
        if (dateA < dateB) {
            return -1;
        }

        if (dateA > dateB) {
            return 1;
        }

        return 0;
    }
}
