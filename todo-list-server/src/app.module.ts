import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/todo', { useCreateIndex: true, useFindAndModify: false }),
        AuthModule,
        ProjectModule,
        TodoModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
