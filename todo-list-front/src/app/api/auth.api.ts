import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { SignInRequest, SignInResponse } from '../auth/types/signin';
import { SignUpRequest, SingUpResponse } from '../auth/types/signup';
import { RequestApi } from './request.api';

@Injectable({ providedIn: 'root' })
export class AuthApi extends RequestApi {
    private endpoint = 'auth';

    constructor(protected readonly http: HttpClient, protected readonly authenticationService: AuthService) {
        super(http, authenticationService);
    }

    public singIn(body: SignInRequest): Observable<SignInResponse> {
        return this.post<SignInRequest, SignInResponse>(`${this.endpoint}/signin`, body).pipe(
            tap((response) => this.authenticationService.storeUser(response)),
        );
    }

    public signUp(body: SignUpRequest): Observable<SingUpResponse> {
        return this.post<SignUpRequest, SingUpResponse>(`${this.endpoint}/signup`, body).pipe(
            tap((response) => this.authenticationService.storeUser(response)),
        );
    }
}
