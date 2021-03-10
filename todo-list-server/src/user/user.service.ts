import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from '../common/object-id.helper';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    public get users(): Model<UserDocument> {
        return this.UserModel;
    }

    constructor(@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) {}

    public async findById(_id: ObjectId): Promise<User> {
        return this.users.findById(_id).exec();
    }

    public findUserByEmail(email: string): Promise<User> {
        return this.users.findOne({ email }).select('+password').exec();
    }

    public async create(dto: User): Promise<User> {
        return this.users.create(dto);
    }
}
