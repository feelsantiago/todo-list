import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { ObjectIdTransform } from '../../common/object-id.helper';
import { User } from '../../user/user.schema';
import { UserService } from '../../user/user.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { SignInPayload } from '../types/sign-in.payload';
import { TokenPayload } from '../types/token.payload';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly tokenService: TokenService) {}

    public async validate(payload: TokenPayload): Promise<User> {
        const user = await this.userService.findById(ObjectIdTransform(payload.id));

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

    public async signIn(dto: SignInDto): Promise<SignInPayload> {
        const user = await this.userService.findUserByEmail(dto.email);

        if (!user) {
            throw new UnauthorizedException();
        }

        const validation = await this.comparePassword(dto.password, user.password);

        if (!validation) {
            throw new UnauthorizedException();
        }

        return this.createSignInPayload(user.id, user.name, user.email);
    }

    public async signUp(dto: SignUpDto): Promise<SignInPayload> {
        const user = await this.userService.create(dto as User);
        return this.createSignInPayload(user.id, user.name, user.email);
    }

    private createSignInPayload(id: string, user: string, email: string): SignInPayload {
        const token = this.tokenService.createToken(id);
        return { token, user, email };
    }

    private async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
