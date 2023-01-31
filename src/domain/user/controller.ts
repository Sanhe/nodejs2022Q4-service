import { Controller, Get } from '@nestjs/common';
import { UserService } from './service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    const users = this.userService.findAll();

    return users;
  }
}
