import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ProjectController } from './project.controller';
import { Project, ProjectSchema } from './project.schema';
import { ProjectService } from './project.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]), AuthModule],
    controllers: [ProjectController],
    providers: [ProjectService],
    exports: [ProjectService],
})
export class ProjectModule {}
