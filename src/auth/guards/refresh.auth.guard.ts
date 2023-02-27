import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const isRefreshTokenEmpty = !request.body?.refreshToken;

    if (isRefreshTokenEmpty) {
      throw new UnauthorizedException('Refresh token is empty.');
    }

    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw (
        err || new ForbiddenException('Refresh token is invalid or expired.')
      );
    }

    return user;
  }
}
