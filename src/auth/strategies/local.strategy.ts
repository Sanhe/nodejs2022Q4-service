import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CustomLoggerService } from '../../common/logger/logger.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private logger: CustomLoggerService,
  ) {
    super({
      usernameField: 'login',
    });
  }

  async validate(login: string, password: string): Promise<any> {
    const isLoginEmpty = typeof login !== 'string' || login.length === 0;
    const isPasswordEmpty =
      typeof password !== 'string' || password.length === 0;

    if (isLoginEmpty || isPasswordEmpty) {
      throw new BadRequestException(
        'Login or password is empty or has invalid type',
      );
    }

    const user = await this.authService.validateUser(login, password);

    if (!user) {
      throw new ForbiddenException('User or password is invalid!');
    }

    return user;
  }
}
