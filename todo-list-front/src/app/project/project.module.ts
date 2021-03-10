import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoModule } from '../todo/todo.module';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectListComponent } from './project-list/project-list.component';

import { ProjectComponent } from './project.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TodoModule],
    declarations: [ProjectComponent, ProjectListComponent, ProjectCreateComponent],
    exports: [ProjectListComponent],
    providers: [],
})
export class ProjectModule {}
