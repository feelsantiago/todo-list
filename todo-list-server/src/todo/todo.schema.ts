import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Entity } from '../common/types/entity';

@Schema({ timestamps: true })
export class Todo extends Entity {
    @Prop({ required: true })
    public description: string;

    @Prop({ default: false })
    public completed: boolean;

    @Prop({ default: undefined })
    public finishedDate: Date;
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);
