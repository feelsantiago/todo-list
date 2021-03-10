import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserInfo } from '../auth/decorators/user.decorator';
import { TokenGuard } from '../auth/guards/token.guard';
import { ObjectId } from '../common/object-id.helper';
import { ObjectIdPipe } from '../pipes/object-id.pipe';
import { User } from '../user/user.schema';
import { ProjectDto } from './project.dto';
import { Project } from './project.schema';
import { ProjectService } from './project.service';

@Controller('project')
@UseGuards(TokenGuard)
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post()
    public async create(@Body() dto: ProjectDto, @UserInfo() user: User): Promise<Project> {
        return this.projectService.create(dto, user._id);
    }

    @Put(':id')
    public async update(
        @Param('id', ObjectIdPipe) id: ObjectId,
        @Body() dto: ProjectDto,
        @UserInfo() user: User,
    ): Promise<Project> {
        return this.projectService.update(id, dto, user._id);
    }

    @Delete(':id')
    public async delete(@Param('id', ObjectIdPipe) id: ObjectId, @UserInfo() user: User): Promise<boolean> {
        return this.projectService.delete(id, user._id);
    }

    @Get()
    public async getAll(@UserInfo() user: User): Promise<Project[]> {
        return this.projectService.getAll(user._id);
    }
}
