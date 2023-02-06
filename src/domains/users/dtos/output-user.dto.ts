import { OutputUserDtoInterface } from '../interfaces/output-user.dto';
import { UserEntity } from '../entities/user.entity';

export class OutputUserDto implements OutputUserDtoInterface {
  readonly id: string;
  readonly login: string;
  readonly version: number;
  readonly createdAt: number;
  readonly updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    this.id = partial.id;
    this.login = partial.login;
    this.version = partial.version;
    this.createdAt = partial.createdAt;
    this.updatedAt = partial.updatedAt;
  }
}
