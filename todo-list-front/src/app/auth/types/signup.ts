import { SignInResponse } from './signin';

export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
}

export type SingUpResponse = SignInResponse;
