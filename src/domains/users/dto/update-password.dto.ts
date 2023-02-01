import { IsNotEmpty, IsString } from 'class-validator';
import { UpdatePasswordDtoInterface } from '../interfaces/update-password.dto.interface';

export class UpdatePasswordDto implements UpdatePasswordDtoInterface {
  @IsString()
  @IsNotEmpty()
  readonly oldPassword: string;

  @IsString()
  @IsNotEmpty()
  readonly newPassword: string;
}
