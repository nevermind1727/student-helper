import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
