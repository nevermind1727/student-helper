import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      // Put config in `.env`
      clientID: configService.get<string>('OAUTH_GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('OAUTH_GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('OAUTH_GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { emails } = profile;
    const _id = new Types.ObjectId();
    console.log('Inside google strategy');
    return {
      username: emails[0].value,
      _id,
    };
  }
}
