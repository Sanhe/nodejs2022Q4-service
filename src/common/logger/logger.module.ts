import { Module } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';
import { LoggerMiddleware } from './logger.middleware';
import { LoggerToFileService } from './logger-to-file.service';

@Module({
  imports: [],
  providers: [CustomLoggerService, LoggerMiddleware, LoggerToFileService],
  exports: [CustomLoggerService, LoggerMiddleware, LoggerToFileService],
})
export class LoggerModule {}
