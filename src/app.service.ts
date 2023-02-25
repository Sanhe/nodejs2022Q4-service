import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from './common/logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: CustomLoggerService) {}

  getLogTest(): string {
    this.logger.log('test log');
    this.logger.error('error log');
    this.logger.warn('warning log');
    this.logger.debug('debug log');
    this.logger.verbose('verbose log');

    throw new Error('test');

    return 'Test log!';
  }
}
