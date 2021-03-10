import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { AuthService } from './services/auth.service';
import { SignInPayload } from './types/sign-in.payload';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    public async signIn(@Body() dto: SignInDto): Promise<SignInPayload> {
        return this.authService.signIn(dto);
    }

    @Post('signup')
    public async signUp(@Body() dto: SignUpDto): Promise<SignInPayload> {
        return this.authService.signUp(dto);
    }
}
