import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iif } from 'rxjs';
import { AuthApi } from '../../api/auth.api';
import { AuthFormValue } from '../types/form';

@Component({
    selector: 'app-auth-card',
    templateUrl: './auth-card.component.html',
    styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent implements OnInit {
    public isRegister = false;

    constructor(private readonly router: Router, private readonly authApi: AuthApi) {}

    public ngOnInit(): void {}

    public onChangeSingInOrSingUpForm(): void {
        this.isRegister = !this.isRegister;
    }

    public onFormSubmitted({ name, email, password }: AuthFormValue): void {
        iif(
            () => this.isRegister,
            this.authApi.signUp({ name, email, password }),
            this.authApi.singIn({ email, password }),
        ).subscribe(() => {
            void this.router.navigate(['/dashboard']);
        });
    }
}
