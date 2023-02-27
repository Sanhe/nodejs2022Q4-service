import { IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateUserDtoInterface } from '../interfaces/create-user.dto.interface';
import {
  USER_LOGIN_MAX_LENGTH,
  USER_LOGIN_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from '../users.config';

export class CreateUserDto implements CreateUserDtoInterface {
  @IsString()
  @IsNotEmpty()
  @Length(USER_LOGIN_MIN_LENGTH, USER_LOGIN_MAX_LENGTH)
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  @Length(USER_PASSWORD_MIN_LENGTH, USER_PASSWORD_MAX_LENGTH)
  readonly password: string;
}
