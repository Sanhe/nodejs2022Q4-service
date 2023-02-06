import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIG_PORT_KEY } from './config/defaults';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { docsMessages } from './common/messages/docs.messages';

const docConfig = new DocumentBuilder()
  .setTitle(docsMessages.INFO_TITLE)
  .setDescription(docsMessages.INFO_DESCRIPTION)
  .setVersion(docsMessages.OPEN_API_VERSION)
  .addTag(docsMessages.OPEN_API_TAG)
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const apiPort = configService.get(CONFIG_PORT_KEY);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('doc', app, document);

  await app.listen(apiPort);
}

bootstrap();
