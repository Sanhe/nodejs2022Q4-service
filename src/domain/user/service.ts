import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll(): string[] {
    return ['User First', 'User Second'];
  }
}
