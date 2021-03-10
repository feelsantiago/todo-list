import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [TokenService, AuthService],
    exports: [TokenService, AuthService],
})
export class AuthModule {}
