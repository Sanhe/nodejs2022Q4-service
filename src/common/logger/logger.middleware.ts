import { constants as httpStatus } from 'http2';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';
import { NextFunction, Request, Response } from 'express';
import { finished } from 'stream';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLoggerService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, query, body } = request;
    const message = `[Request] ${method} ${originalUrl} ${JSON.stringify(
      query,
    )} ${JSON.stringify(body)}`;

    this.logger.log(message);

    finished(response, () => {
      const { statusCode, statusMessage } = response;
      const responseMessage = `[Response] ${statusCode} ${statusMessage}`;

      if (statusCode >= httpStatus.HTTP_STATUS_INTERNAL_SERVER_ERROR) {
        this.logger.error(responseMessage);
      } else if (statusCode >= httpStatus.HTTP_STATUS_BAD_REQUEST) {
        this.logger.warn(responseMessage);
      } else {
        this.logger.log(responseMessage);
      }
    });

    next();
  }
}
