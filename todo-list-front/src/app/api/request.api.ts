import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

interface Headers {
    [header: string]: string | string[];
}

export class RequestApi {
    protected baseUrl = environment.baseUrl;

    constructor(protected readonly http: HttpClient, protected readonly authenticationService: AuthService) {}

    protected post<T, K>(url: string, body: T, _query?: unknown): Observable<K> {
        return this.http
            .post<K>(`${this.baseUrl}/${url}`, body, { headers: this.jwt() })
            .pipe(catchError((error) => this.handleError(error)));
    }

    protected put<T, K>(url: string, body: T, _query?: unknown): Observable<K> {
        return this.http
            .put<K>(`${this.baseUrl}/${url}`, body, { headers: this.jwt() })
            .pipe(catchError((error) => this.handleError(error)));
    }

    protected get<T>(url: string, _query?: unknown): Observable<T[]> {
        return this.http
            .get<T[]>(`${this.baseUrl}/${url}`, { headers: this.jwt() })
            .pipe(catchError((error) => this.handleError(error)));
    }

    protected getOne<T>(url: string, _query?: unknown): Observable<T> {
        return this.http
            .get<T>(`${this.baseUrl}/${url}`, { headers: this.jwt() })
            .pipe(catchError((error) => this.handleError(error)));
    }

    protected delete<T>(url: string, _query?: unknown): Observable<T> {
        return this.http
            .delete<T>(`${this.baseUrl}/${url}`, { headers: this.jwt() })
            .pipe(catchError((error) => this.handleError(error)));
    }

    protected jwt(): Headers {
        const { token } = this.authenticationService;
        const headers: Headers = {};

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        return headers;
    }

    /* eslint-disable no-console */
    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(`Backend returned code ${error.status},`);
            console.log(error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError('Something bad happened; please try again later.');
    }
    /* eslint-enable no-console */
}
