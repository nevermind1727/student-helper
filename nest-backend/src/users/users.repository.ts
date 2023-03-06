import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async insertOne(params: User): Promise<UserDocument> {
    const newUser = new this.userModel(params);
    return newUser.save();
  }

  async findOneByusername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username });
  }
}
