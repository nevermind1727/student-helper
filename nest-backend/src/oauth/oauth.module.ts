import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Module({
  imports: [AuthModule],
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}
