import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from './common/logger/logger.service';
import { NotImplementedException } from '@nestjs/common/exceptions/not-implemented.exception';

@Injectable()
export class AppService {
  constructor(private readonly logger: CustomLoggerService) {}

  getLogTest(): string {
    // TODO: Remove this test code
    this.logger.log('test log');
    this.logger.error('error log');
    this.logger.warn('warning log');
    this.logger.debug('debug log');
    this.logger.verbose('verbose log');

    throw new Error('test');

    return 'Test log!';
  }
}
