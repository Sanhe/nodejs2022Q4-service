import { constants as httpStatus } from 'node:http2';
import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../domains/users/users.service';
import { CreateUserDto } from '../domains/users/dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(createUserDto: CreateUserDto) {
    const user = await this.validateUser(
      createUserDto.login,
      createUserDto.password,
    );

    if (!user) {
      throw new HttpException(
        'Invalid credentials',
        httpStatus.HTTP_STATUS_BAD_REQUEST,
      );
    }

    const payload = {
      userId: user.id,
      login: user.login,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
    });

    return {
      access_token: accessToken,
      payload,
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    return await this.usersService.validateUser(username, password);
  }
}
