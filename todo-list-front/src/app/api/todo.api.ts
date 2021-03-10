import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Todo, TodoCreateRequest, TodoUpdateRequest } from '../todo/types/todo';
import { RequestApi } from './request.api';

@Injectable({ providedIn: 'root' })
export class TodoApi extends RequestApi {
    private endpoint = 'todo';

    constructor(protected readonly http: HttpClient, protected readonly authenticationService: AuthService) {
        super(http, authenticationService);
    }

    public create(project: string, body: TodoCreateRequest): Observable<Todo> {
        return this.post<TodoCreateRequest, Todo>(`${this.endpoint}/${project}`, body);
    }

    public remove(id: string, project: string): Observable<boolean> {
        return this.delete<boolean>(`${this.endpoint}/${project}/${id}`);
    }

    public complete(id: string, project: string): Observable<Todo> {
        return this.put<string, Todo>(`${this.endpoint}/complete/${project}/${id}`, '');
    }

    public update(id: string, project: string, body: TodoUpdateRequest): Observable<Todo> {
        return this.put<TodoUpdateRequest, Todo>(`${this.endpoint}/${project}/${id}`, body);
    }
}
