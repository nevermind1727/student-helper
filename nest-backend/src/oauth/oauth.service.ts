import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';
import mongoose from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserResponse } from 'src/utils/types';

@Injectable()
export class OauthService {
  private readonly oauth2Client;
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    this.oauth2Client = new OAuth2Client(
      configService.get<string>('OAUTH_GOOGLE_CLIENT_ID'),
      configService.get<string>('OAUTH_GOOGLE_CLIENT_SECRET'),
    );
  }

  async googleAuth(token: string, res: Response): Promise<UserResponse> {
    const ticket = await this.oauth2Client.verifyIdToken({
      idToken: token,
      audience: this.configService.get<string>('OAUTH_GOOGLE_CLIENT_ID'),
    });
    const newId = new mongoose.Types.ObjectId();
    const ticketEmail = ticket.getPayload().email;
    const username = ticket
      .getPayload()
      .email.substring(0, ticketEmail.indexOf('@'));
    const newUser: UserResponse = { _id: newId, username };
    const { access_token } = await this.authService.generateToken(newUser);
    console.log(access_token);
    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: true,
    });
    return newUser;
  }
}
