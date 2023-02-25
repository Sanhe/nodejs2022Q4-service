import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new CustomLoggerService('HTTP', {});

  use(request: Request, response: Response, next: any): void {
    // const { ip, method, path: url } = request;

    // response.on('finish', () => {
    //   const { statusCode } = response;
    //   const contentLength = response.get('content-length');
    //   this.logger.log(`${statusCode} ${contentLength} - ${request.method} ${request.originalUrl}`);
    // }

    this.logger.log(`[Middleware] test`);

    next();
  }
}
