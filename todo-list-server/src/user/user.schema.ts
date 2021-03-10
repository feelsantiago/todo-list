import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Entity } from '../common/types/entity';

@Schema()
export class User extends Entity {
    @Prop({ required: true })
    public name: string;

    @Prop({ required: true, unique: true })
    public email: string;

    @Prop({ required: true, unique: true, select: false })
    public password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSchemaFactory = (): typeof UserSchema => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    UserSchema.pre<UserDocument>('save', async function () {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(this.password, salt);

            this.password = hash;
        }
    });

    return UserSchema;
};
