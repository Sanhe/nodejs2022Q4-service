import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { CustomLoggerService } from './common/logger/logger.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLoggerService) {}

  intercept<R>(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<R> | Promise<Observable<R>> {
    const observ = next.handle().pipe(
      map((data) => {
        this.logger.debug(`[Response Body] ${JSON.stringify(data)}\n`);

        return data;
      }),
    );

    return observ;
  }
}
