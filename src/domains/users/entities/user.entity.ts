import { UserEntityInterface } from '../interfaces/user.entity.interface';

export class UserEntity implements UserEntityInterface {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
