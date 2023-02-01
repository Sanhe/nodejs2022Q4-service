import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateUserDtoInterface } from '../interfaces/update-user.dto.interface';

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements UpdateUserDtoInterface
{
  @IsString()
  @IsNotEmpty()
  readonly oldPassword: string;

  @IsString()
  @IsNotEmpty()
  readonly newPassword: string;
}
