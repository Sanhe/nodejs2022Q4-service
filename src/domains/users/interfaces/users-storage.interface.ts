import { UserEntityInterface } from './user.entity.interface';

export interface UsersStorageInterface {
  save(user: UserEntityInterface): Promise<void>;

  findById(id: string): Promise<UserEntityInterface | undefined>;

  findAll(): Promise<UserEntityInterface[]>;

  update(id: string, user: UserEntityInterface): Promise<void>;

  remove(id: string): Promise<void>;
}
