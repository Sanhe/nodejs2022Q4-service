import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_PORT } from './common/env';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(API_PORT);
}
bootstrap();
