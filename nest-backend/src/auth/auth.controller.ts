import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/users/users.schema';
import { UserResponse } from 'src/utils/types';
import { AuthService } from './auth.service';
import { FacebookOauthGuard } from './guards/facebook-oauth.guard';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LinkedinOauthGuard } from './guards/linkedin-oauth.guard';
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
    const { access_token } = this.authService.generateToken(user);
    res.cookie('jwt', access_token, {
      httpOnly: true,
    });
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/status')
  async getStatus(@GetUser() user) {
    return user;
  }

  @UseGuards(GoogleOauthGuard)
  @Get('/google')
  async googleAuth() {}

  @UseGuards(GoogleOauthGuard)
  @Get('google/redirect')
  async googleRedirect(
    @GetUser() user: UserResponse,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = this.authService.generateToken(user);
    res.cookie('jwt', access_token, {
      httpOnly: true,
    });
    res.redirect('http://localhost:3000/');
    return user;
  }

  @UseGuards(FacebookOauthGuard)
  @Get('/facebook')
  async facebookAuth() {}

  @UseGuards(FacebookOauthGuard)
  @Get('/facebook/redirect')
  async facebookRedirect(
    @GetUser() user: UserResponse,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = this.authService.generateToken(user);
    res.cookie('jwt', access_token, {
      httpOnly: true,
    });
    res.redirect('http://localhost:3000/');
    return user;
  }

  @UseGuards(LinkedinOauthGuard)
  @Get('/linkedin')
  async linkedinAuth() {}

  @UseGuards(LinkedinOauthGuard)
  @Get('/linkedin/redirect')
  async linkedinRedirect(
    @GetUser() user: UserResponse,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = this.authService.generateToken(user);
    res.cookie('jwt', access_token, {
      httpOnly: true,
    });
    res.redirect('http://localhost:3000/');
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('jwt', 'none', {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    });
  }
}
