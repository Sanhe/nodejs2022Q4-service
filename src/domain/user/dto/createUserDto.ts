import { IsNotEmpty, IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export { CreateUserDto };
