import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserResponse } from 'src/utils/types';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';
import { UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserParams: CreateUserDto): Promise<UserResponse> {
    await this.validateUserByusername(createUserParams.username);
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);
    const newUser = await this.usersRepository.insertOne({
      ...createUserParams,
      password: hashedPassword,
    });
    return this.buildResponse(newUser);
  }

  async validateUserByusername(username: string): Promise<void> {
    const user = await this.usersRepository.findOneByusername(username);
    if (user) {
      throw new BadRequestException(
        `User with username: ${username} already exists!`,
      );
    }
    return;
  }

  async validateExistingUser(username: string): Promise<UserDocument> {
    const existingUser = await this.usersRepository.findOneByusername(username);
    if (!existingUser) {
      throw new UnauthorizedException(
        `User with username: ${username} not found. Provide a valid username.`,
      );
    }
    return existingUser;
  }

  private buildResponse(user: UserDocument): UserResponse {
    return {
      _id: user._id,
      username: user.username,
    };
  }
}
