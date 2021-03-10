import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Project, ProjectCreateRequest, ProjectEditRequest } from '../project/types/project';
import { RequestApi } from './request.api';

@Injectable({ providedIn: 'root' })
export class ProjectApi extends RequestApi {
    private endpoint = 'project';

    constructor(protected readonly http: HttpClient, protected readonly authenticationService: AuthService) {
        super(http, authenticationService);
    }

    public create(body: ProjectCreateRequest): Observable<Project> {
        return this.post<ProjectCreateRequest, Project>(this.endpoint, body);
    }

    public edit(id: string, body: ProjectEditRequest): Observable<Project> {
        return this.put<ProjectEditRequest, Project>(`${this.endpoint}/${id}`, body);
    }

    public getAll(): Observable<Project[]> {
        return this.get<Project>(this.endpoint);
    }

    public remove(id: string): Observable<boolean> {
        return this.delete<boolean>(`${this.endpoint}/${id}`);
    }
}
