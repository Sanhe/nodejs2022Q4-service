import { IsNotEmpty, IsString } from 'class-validator';

class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export { UpdateUserDto };
