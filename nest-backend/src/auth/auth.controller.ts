import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GetUser } from 'src/decorators/get-user.decorator';
import { UserResponse } from 'src/utils/types';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  @UseGuards(LocalAuthGuard)
  async signIn(
    @GetUser() user: UserResponse,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(user, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('jwt', 'none', {
      expires: new Date(Date.now() + 100),
      httpOnly: true,
    });
    return;
  }
}
