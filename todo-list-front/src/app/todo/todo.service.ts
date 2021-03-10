import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoApi } from '../api/todo.api';
import { Todo, TodoCreateRequest, TodoUpdateRequest } from './types/todo';

@Injectable({ providedIn: 'root' })
export class TodoService {
    constructor(private readonly todoApi: TodoApi) {}

    public createNewTodoForProject(projectId: string, body: TodoCreateRequest): Observable<Todo> {
        return this.todoApi.create(projectId, body);
    }

    public complete(todoId: string, projectId: string): Observable<Todo> {
        return this.todoApi.complete(todoId, projectId);
    }

    public updateDescription(todoId: string, projectId: string, body: TodoUpdateRequest): Observable<Todo> {
        return this.todoApi.update(todoId, projectId, body);
    }

    public delete(todoId: string, projectId: string): Observable<boolean> {
        return this.todoApi.remove(todoId, projectId);
    }
}
