import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-linkedin-oauth2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';

@Injectable()
export class LinkedinOauthStrategy extends PassportStrategy(
  Strategy,
  'linkedin',
) {
  constructor(configService: ConfigService) {
    super({
      // Put config in `.env`
      clientID: configService.get<string>('OAUTH_LINKEDIN_CLIENT_ID'),
      clientSecret: configService.get<string>('OAUTH_LINKEDIN_CLIENT_SECRET'),
      callbackURL: configService.get<string>('OAUTH_LINKEDIN_REDIRECT_URL'),
      scope: ['r_emailaddress', 'r_liteprofile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { emails } = profile;
    const _id = new Types.ObjectId();

    return {
      username: emails[0].value,
      _id,
    };
  }
}
