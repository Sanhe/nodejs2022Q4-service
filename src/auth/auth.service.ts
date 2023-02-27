import { constants as httpStatus } from 'node:http2';
import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../domains/users/users.service';
import { CreateUserDto } from '../domains/users/dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../domains/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    return await this.usersService.validateUser(username, password);
  }

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

  private getJwtPayload(user: UserEntity) {
    return {
      userId: user.id,
      login: user.login,
    };
  }

  private getJwtAccessToken(payload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
    });

    return accessToken;
  }

  private getJwtRefreshToken(payload) {
    const refreshPayload = {
      ...payload,
      refresh: true,
    };
    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
    });

    return refreshToken;
  }

  async authenticate(user: UserEntity) {
    const payload = this.getJwtPayload(user);
    const accessToken = this.getJwtAccessToken(payload);
    const refreshToken = this.getJwtRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      payload,
    };
  }

  async login(user: UserEntity) {
    return await this.authenticate(user);
  }

  async refresh(user: UserEntity) {
    return await this.authenticate(user);
  }
}
