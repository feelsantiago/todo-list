import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService, private readonly authService: AuthService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest<Request>();
            const token = this.extractAuthorizationToken(request.headers.authorization);
            const payload = this.tokenService.decodeToken(token);
            const user = await this.authService.validate(payload);

            request.user = user;
            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }

    private extractAuthorizationToken(value: string): string {
        if (!value) {
            throw new Error('Empty Value');
        }

        const [type, token] = value.split(' ');

        if (type !== 'Bearer') {
            throw new Error('Not In Format');
        }

        return token;
    }
}
