import { Module } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [],
  providers: [CustomLoggerService, LoggerMiddleware],
  exports: [CustomLoggerService, LoggerMiddleware],
})
export class LoggerModule {}
