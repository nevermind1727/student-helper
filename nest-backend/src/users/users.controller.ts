import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { UserResponse } from 'src/utils/types';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    return this.usersService.createUser(createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@GetUser() user: UserResponse): Promise<UserResponse> {
    return user;
  }
}
