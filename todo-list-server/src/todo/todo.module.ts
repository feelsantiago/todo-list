import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProjectModule } from '../project/project.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
    imports: [AuthModule, ProjectModule],
    controllers: [TodoController],
    providers: [TodoService],
    exports: [TodoService],
})
export class TodoModule {}
