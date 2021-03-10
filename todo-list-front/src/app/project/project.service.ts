import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectApi } from '../api/project.api';
import { Project, ProjectCreateRequest, ProjectEditRequest } from './types/project';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    constructor(private readonly projectApi: ProjectApi) {}

    public getProjects(): Observable<Project[]> {
        return this.projectApi.getAll();
    }

    public createNewProject(project: ProjectCreateRequest): Observable<Project> {
        return this.projectApi.create(project);
    }

    public update(projectId: string, body: ProjectEditRequest): Observable<Project> {
        return this.projectApi.edit(projectId, body);
    }

    public delete(projectId: string): Observable<boolean> {
        return this.projectApi.remove(projectId);
    }
}
