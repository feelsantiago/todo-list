import { Injectable } from '@nestjs/common';
import { ObjectId } from '../common/object-id.helper';
import { ProjectService } from '../project/project.service';
import { TodoDto } from './todo.dto';
import { Todo } from './todo.schema';

@Injectable()
export class TodoService {
    constructor(private readonly projectService: ProjectService) {}

    public async create(dto: TodoDto, projectId: ObjectId, userId: ObjectId): Promise<Todo> {
        const project = await this.projectService.projects
            .findOneAndUpdate({ _id: projectId, owner: userId }, { $push: { todos: dto as Todo } }, { new: true })
            .exec();
        return project.todos.pop();
    }

    public async complete(id: ObjectId, projectId: ObjectId, userId: ObjectId): Promise<Todo> {
        const project = await this.projectService.projects
            .findOneAndUpdate(
                { _id: projectId, owner: userId, 'todos._id': id },
                { $set: { 'todos.$.completed': true, 'todos.$.finishDate': new Date() } },
                { new: true },
            )
            .exec();
        return project.todos.find((todo) => todo.id === id.toHexString());
    }

    public async update(id: ObjectId, projectId: ObjectId, dto: TodoDto, userId: ObjectId): Promise<Todo> {
        const project = await this.projectService.projects
            .findOneAndUpdate(
                { _id: projectId, owner: userId, 'todos._id': id },
                { $set: { 'todos.$.description': dto.description } },
                { new: true },
            )
            .exec();
        return project.todos.find((todo) => todo.id === id.toHexString());
    }

    public async delete(id: ObjectId, projectId: ObjectId, userId: ObjectId): Promise<boolean> {
        await this.projectService.projects
            .findOneAndUpdate({ _id: projectId, owner: userId }, { $pull: { todos: { _id: id } } })
            .exec();
        return true;
    }
}
