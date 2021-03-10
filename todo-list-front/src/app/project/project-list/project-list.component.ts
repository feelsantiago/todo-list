import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, repeatWhen, scan, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { ProjectService } from '../project.service';
import { Project, ProjectCreateRequest } from '../types/project';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
    public projects$: Observable<Project[]>;

    public submitted$: Observable<Project[]>;

    private submittedEvent = new Subject<ProjectCreateRequest>();

    private projectChangeEvent = new Subject<void>();

    constructor(private readonly projectService: ProjectService) {}

    public ngOnInit(): void {
        this.submitted$ = this.submittedEvent.pipe(
            switchMap((value) => this.projectService.createNewProject(value)),
            map((project) => [project]),
            scan((acc, next) => [...acc, ...next]),
            startWith([]),
        );

        const projects$ = this.projectService.getProjects().pipe(
            shareReplay({ bufferSize: 1, refCount: true }),
            repeatWhen(() => this.projectChangeEvent.asObservable()),
        );

        this.projects$ = combineLatest([projects$, this.submitted$]).pipe(
            map((value) => value.reduce((acc, next) => [...acc, ...next], [])),
            map((value) => value.filter((project) => !project.isDeleted)),
        );
    }

    public onSubmitted(value: ProjectCreateRequest): void {
        this.submittedEvent.next(value);
    }

    public onProjectUpdated(): void {
        this.projectChangeEvent.next();
    }

    public onProjectDeleted(): void {
        this.projectChangeEvent.next();
    }
}
