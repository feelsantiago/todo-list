import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from '../common/object-id.helper';
import { ProjectDto } from './project.dto';
import { Project, ProjectDocument } from './project.schema';

@Injectable()
export class ProjectService {
    public get projects(): Model<ProjectDocument> {
        return this.projectModel;
    }

    constructor(@InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>) {}

    public async create(dto: ProjectDto, userId: ObjectId): Promise<Project> {
        const project = { ...dto, owner: userId };
        return this.projects.create(project);
    }

    public async update(id: ObjectId, dto: ProjectDto, userId: ObjectId): Promise<Project> {
        return this.projects.findOneAndUpdate({ _id: id, owner: userId }, { $set: dto }, { new: true }).exec();
    }

    public async delete(id: ObjectId, userId: ObjectId): Promise<boolean> {
        await this.projects.findOneAndUpdate({ _id: id, owner: userId }, { $set: { isDeleted: true } }).exec();

        return true;
    }

    public async getAll(userId: ObjectId): Promise<Project[]> {
        return this.projects.find({ owner: userId, isDeleted: false }).exec();
    }
}
