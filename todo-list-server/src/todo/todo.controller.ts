import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserInfo } from '../auth/decorators/user.decorator';
import { TokenGuard } from '../auth/guards/token.guard';
import { ObjectId } from '../common/object-id.helper';
import { ObjectIdPipe } from '../pipes/object-id.pipe';
import { User } from '../user/user.schema';
import { TodoDto } from './todo.dto';
import { Todo } from './todo.schema';
import { TodoService } from './todo.service';

@Controller('todo')
@UseGuards(TokenGuard)
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post(':project')
    private async create(
        @Body() dto: TodoDto,
        @Param('project', ObjectIdPipe) projectId: ObjectId,
        @UserInfo() user: User,
    ): Promise<Todo> {
        return this.todoService.create(dto, projectId, user._id);
    }

    @Put('complete/:project/:id')
    private async complete(
        @Param('project', ObjectIdPipe) projectId: ObjectId,
        @Param('id', ObjectIdPipe) id: ObjectId,
        @UserInfo() user: User,
    ): Promise<Todo> {
        return this.todoService.complete(id, projectId, user._id);
    }

    @Put(':project/:id')
    private async update(
        @Param('project', ObjectIdPipe) projectId: ObjectId,
        @Param('id', ObjectIdPipe) id: ObjectId,
        @Body() dto: TodoDto,
        @UserInfo() user: User,
    ): Promise<Todo> {
        return this.todoService.update(id, projectId, dto, user._id);
    }

    @Delete(':project/:id')
    private async delete(
        @Param('project', ObjectIdPipe) projectId,
        @Param('id', ObjectIdPipe) id: ObjectId,
        @UserInfo() user: User,
    ): Promise<boolean> {
        return this.todoService.delete(id, projectId, user._id);
    }
}
