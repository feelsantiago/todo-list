import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthCardComponent } from './auth-card/auth-card.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthComponent } from './auth.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [],
    declarations: [AuthComponent, AuthCardComponent, AuthFormComponent],
    providers: [],
})
export class AuthModule {}
