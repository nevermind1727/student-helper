import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Types } from 'mongoose';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('OAUTH_FACEBOOK_APP_ID'),
      clientSecret: configService.get<string>('OAUTH_FACEBOOK_APP_SECRET'),
      callbackURL: configService.get<string>('OAUTH_FACEBOOK_REDIRECT_URL'),
      scope: 'email',
      profileFields: ['emails'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { emails } = profile;
    const _id = new Types.ObjectId();
    return {
      username: emails[0].value,
      _id,
    };
  }
}
