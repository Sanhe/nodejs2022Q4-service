import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIG_PORT_KEY } from './config/defaults';
import { useContainer } from 'class-validator';
import { SwaggerModule } from '@nestjs/swagger';
import { getOpenApiConfig } from './config/open-api.config';
import { CustomLoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);

  const logger = new CustomLoggerService('Main', {});

  process.on('uncaughtException', (error) => {
    logger.error('[Uncaught Exception]', error);
  });

  process.on('unhandledRejection', (error) => {
    logger.error('[Unhandled Rejection]', error);
  });

  app.useLogger(logger);

  const apiPort = configService.get(CONFIG_PORT_KEY);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const docConfig = await getOpenApiConfig();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('doc', app, document);

  await app.listen(apiPort);
}

bootstrap();
