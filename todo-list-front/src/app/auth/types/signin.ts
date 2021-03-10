export interface User {
    email: string;
    user: string;
}

export interface SignInResponse {
    user: string;
    email: string;
    token: string;
}

export interface SignInRequest {
    email: string;
    password: string;
}
