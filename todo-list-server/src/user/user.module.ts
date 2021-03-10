import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchemaFactory } from './user.schema';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: UserSchemaFactory,
            },
        ]),
    ],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
