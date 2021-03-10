import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthFormValue } from '../types/form';

@Component({
    selector: 'app-auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, OnChanges {
    @Input()
    public isRegister: boolean;

    @Output()
    public onSubmit = new EventEmitter<AuthFormValue>();

    public authForm: FormGroup;

    constructor(private readonly fb: FormBuilder) {}

    public ngOnInit(): void {
        this.setupForm();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.isRegister = changes.isRegister.currentValue as boolean;
        this.addOrRemoveRegisterControls();
    }

    public onFormSubmitted(): void {
        this.onSubmit.emit(this.authForm.value);
    }

    private setupForm(): void {
        this.authForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.required])],
            password: ['', Validators.required],
        });

        this.addOrRemoveRegisterControls();
    }

    private addOrRemoveRegisterControls(): void {
        if (!this.authForm) {
            return;
        }

        if (this.isRegister) {
            const control = this.fb.control('', Validators.required);
            this.authForm.addControl('name', control);
        } else {
            this.authForm.removeControl('name');
        }
    }
}
