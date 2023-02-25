import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';
import { LoggerToFileService } from './logger-to-file.service';

const requiredLogLevels: LogLevel[] = [];

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  private readonly fileLogger: LoggerToFileService;

  constructor(context: string, options: ConsoleLoggerOptions) {
    const logLevels = process.env.LOG_LEVELS?.split(',') || [];
    const defaultOptions = {
      logLevels: [...logLevels, ...requiredLogLevels],
    };

    super(context, {
      ...defaultOptions,
      ...options,
    } as ConsoleLoggerOptions);

    this.fileLogger = new LoggerToFileService();
  }

  async log(message: any, ...optionalParams: any[]) {
    message = `[CustomLogger] ${message}`;

    super.log(message, ...optionalParams);

    await this.fileLogger.log(message, ...optionalParams);
  }

  async error(message: any, ...optionalParams: any[]) {
    message = `[CustomLogger] ${message}`;

    super.error(message, ...optionalParams);

    await this.fileLogger.error(message, ...optionalParams);
  }

  async warn(message: any, ...optionalParams: any[]) {
    message = `[CustomLogger] ${message}`;

    super.warn(message);

    await this.fileLogger.warn(message, ...optionalParams);
  }

  async debug(message: any, ...optionalParams: any[]) {
    message = `[CustomLogger] ${message}`;

    await super.debug(message);

    this.fileLogger.debug(message, ...optionalParams);
  }

  async verbose(message: any, ...optionalParams: any[]) {
    message = `[CustomLogger] ${message}`;

    super.log(message);

    await this.fileLogger.verbose(message, ...optionalParams);
  }

  setLogLevels(levels: LogLevel[]) {
    super.setLogLevels(levels);
  }
}
