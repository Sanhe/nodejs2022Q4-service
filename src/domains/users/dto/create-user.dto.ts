import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDtoInterface } from '../interfaces/create-user.dto.interface';

export class CreateUserDto implements CreateUserDtoInterface {
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
