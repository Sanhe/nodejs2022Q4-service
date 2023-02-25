import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';
import { LoggerToFileService } from './logger-to-file.service';

enum LogLevel {
  ERROR = 0,
  LOG = 1,
  WARN = 2,
  DEBUG = 3,
  VERBOSE = 4,
}

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  private readonly fileLogger: LoggerToFileService;

  private readonly logLevel: number;

  constructor(context: string, options: ConsoleLoggerOptions) {
    const DEFAULT_LOG_LEVEL = 2;

    super(context, options);

    this.logLevel = +process.env.LOG_LEVEL ?? DEFAULT_LOG_LEVEL;

    this.fileLogger = new LoggerToFileService();
  }

  private isLogLevelReached(level: LogLevel): boolean {
    return level <= this.logLevel;
  }

  async log(message: any, ...optionalParams: any[]) {
    if (!this.isLogLevelReached(LogLevel.LOG)) {
      return;
    }

    message = `[CustomLogger] ${message}`;

    super.log(message, ...optionalParams);

    await this.fileLogger.log(message);
  }

  async error(message: any, ...optionalParams: any[]) {
    if (!this.isLogLevelReached(LogLevel.ERROR)) {
      return;
    }

    message = `[CustomLogger] ${message}`;

    super.error(message, ...optionalParams);

    await this.fileLogger.error(message);
  }

  async warn(message: any, ...optionalParams: any[]) {
    if (!this.isLogLevelReached(LogLevel.WARN)) {
      return;
    }

    message = `[CustomLogger] ${message}`;

    super.warn(message, ...optionalParams);

    await this.fileLogger.warn(message);
  }

  async debug(message: any, ...optionalParams: any[]) {
    if (!this.isLogLevelReached(LogLevel.DEBUG)) {
      return;
    }

    message = `[CustomLogger] ${message}`;

    await super.debug(message, ...optionalParams);

    this.fileLogger.debug(message);
  }

  async verbose(message: any, ...optionalParams: any[]) {
    if (!this.isLogLevelReached(LogLevel.VERBOSE)) {
      return;
    }

    message = `[CustomLogger] ${message}`;

    super.log(message, ...optionalParams);

    await this.fileLogger.verbose(message);
  }
}
