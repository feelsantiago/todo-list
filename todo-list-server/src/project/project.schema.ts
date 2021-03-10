import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectId } from '../common/object-id.helper';
import { Entity } from '../common/types/entity';
import { Todo, TodoSchema } from '../todo/todo.schema';

@Schema({ timestamps: true })
export class Project extends Entity {
    @Prop({ required: true })
    public name: string;

    @Prop({ default: false })
    public isDeleted: boolean;

    @Prop({ type: [TodoSchema] })
    public todos: Todo[];

    @Prop({ type: Types.ObjectId })
    public owner: ObjectId;
}

export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
