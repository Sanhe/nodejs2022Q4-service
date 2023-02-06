import { Exclude } from 'class-transformer';
import { IsInt, IsString, IsUUID } from 'class-validator';
import { UserEntityInterface } from '../interfaces/user.entity.interface';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../../common/uuid/config';

export class UserEntity implements UserEntityInterface {
  @IsString()
  @IsUUID(DEFAULT_UUID_VERSION_NUMBER)
  id: string;

  @IsString()
  login: string;

  @IsString()
  @Exclude()
  password: string;

  @IsInt()
  version: number;

  @IsInt()
  createdAt: number;

  @IsInt()
  updatedAt: number;
}
