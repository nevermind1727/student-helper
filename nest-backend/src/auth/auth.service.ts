import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtPayload, UserResponse } from 'src/utils/types';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponse> {
    const user = await this.usersService.validateExistingUser(username);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(`Invalid password.`);
    }
    return {
      _id: user._id,
      username: user.username,
    };
  }

  async signIn(user: UserResponse, res: Response): Promise<UserResponse> {
    const { access_token } = await this.generateToken(user);
    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: true,
    });
    return user;
  }

  async generateToken(user: UserResponse): Promise<any> {
    const payload: JwtPayload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
