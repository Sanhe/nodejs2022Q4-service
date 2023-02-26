import { constants as httpStatus } from 'node:http2';
import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../domains/users/users.service';
import { CreateUserDto } from '../domains/users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneByLogin(
      createUserDto.login,
    );

    if (existingUser) {
      throw new HttpException(
        'User already exists',
        httpStatus.HTTP_STATUS_CONFLICT,
      );
    }

    const user = await this.usersService.create(createUserDto);

    return user;
  }
}
