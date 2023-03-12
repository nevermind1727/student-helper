import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  });
  app.use(cookieParser());
  const port = configService.get<number>('PORT');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
