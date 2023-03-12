import { Body, Controller, Post, Res } from '@nestjs/common';
import { GoogleAuthDto } from './dtos/google-auth.dto';
import { OauthService } from './oauth.service';
import { Response } from 'express';

@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Post('/google')
  async googleAuth(
    @Body() googleAuthParams: GoogleAuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    return this.oauthService.googleAuth(googleAuthParams.token, res);
  }
}
