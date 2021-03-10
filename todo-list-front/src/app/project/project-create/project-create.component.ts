import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectCreateRequest } from '../types/project';

@Component({
    selector: 'app-project-create',
    templateUrl: './project-create.component.html',
    styleUrls: ['./project-create.component.scss'],
})
export class ProjectCreateComponent implements OnInit {
    @Output()
    public onSubmit = new EventEmitter<ProjectCreateRequest>();

    public projectForm: FormGroup;

    constructor(private readonly fb: FormBuilder) {}

    public ngOnInit(): void {
        this.projectForm = this.fb.group({
            name: ['', Validators.required],
        });
    }

    public onFormSubmitted(): void {
        this.onSubmit.emit(this.projectForm.value);
        this.projectForm.reset();
    }
}
