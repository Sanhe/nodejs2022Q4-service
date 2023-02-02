import { IsNotEmpty, IsString, Length } from 'class-validator';
import { UpdatePasswordDtoInterface } from '../interfaces/update-password.dto.interface';
import {
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from '../users.config';

export class UpdatePasswordDto implements UpdatePasswordDtoInterface {
  @IsString()
  @IsNotEmpty()
  readonly oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @Length(USER_PASSWORD_MIN_LENGTH, USER_PASSWORD_MAX_LENGTH)
  readonly newPassword: string;
}
