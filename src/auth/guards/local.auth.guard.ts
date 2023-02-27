import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user) {
    if (err) {
      throw err;
    }

    if (!user) {
      throw new BadRequestException('Required fields are missing!');
    }

    return user;
  }
}
