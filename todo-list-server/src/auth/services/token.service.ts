import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { TokenPayload } from '../types/token.payload';

@Injectable()
export class TokenService {
    private readonly algorithm = 'aes-256-ctr';

    private readonly password = crypto.randomBytes(32);

    private readonly iv = crypto.randomBytes(16);

    public createToken(id: string, expiration?: number): string {
        const cipher = crypto.createCipheriv(this.algorithm, this.password, this.iv);

        const encrypted = Buffer.concat([cipher.update(JSON.stringify({ id, expiration })), cipher.final()]);
        return encrypted.toString('hex');
    }

    public decodeToken(token: string): TokenPayload {
        try {
            const decipher = crypto.createDecipheriv(
                this.algorithm,
                this.password,
                Buffer.from(this.iv.toString('hex'), 'hex'),
            );

            const decrpyted = Buffer.concat([decipher.update(Buffer.from(token, 'hex')), decipher.final()]);
            const payload = JSON.parse(decrpyted.toString()) as TokenPayload;

            if (payload.id) {
                if (payload.expiration) {
                    // handle expiration
                }

                return payload;
            }

            throw new Error('Invalid Payload');
        } catch {
            throw new Error('Invalid Token');
        }
    }
}
