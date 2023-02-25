import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  constructor(context: string, options: ConsoleLoggerOptions) {
    const defaultOptions = {
      logLevels: process.env.LOG_LEVELS?.split(',') || [],
    };

    super(context, {
      ...defaultOptions,
      ...options,
    } as ConsoleLoggerOptions);
  }

  log(message: any, ...optionalParams: any[]) {
    message = `[CustomLogger] ${message}`;

    super.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    message = `[CustomLogger] ${message}`;

    super.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    message = `[CustomLogger] ${message}`;

    super.warn(message);
  }

  debug(message: any, ...optionalParams: any[]) {
    message = `[CustomLogger] ${message}`;

    super.debug(message);
  }

  verbose(message: any, ...optionalParams: any[]) {
    message = `[CustomLogger] ${message}`;

    super.log(message);
  }

  setLogLevels(levels: LogLevel[]) {
    super.setLogLevels(levels);
  }
}
