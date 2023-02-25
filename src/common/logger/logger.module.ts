import { Module } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';
import { LoggerMiddleware } from './logger.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [],
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
