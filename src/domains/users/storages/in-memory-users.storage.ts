import { Injectable } from '@nestjs/common';
import { UserEntityInterface } from '../interfaces/user.entity.interface';
import { UsersStorageInterface } from '../interfaces/users-storage.interface';

@Injectable()
export class InMemoryUsersStorage implements UsersStorageInterface {
  private readonly users: UserEntityInterface[] = [];

  async save(user: UserEntityInterface): Promise<void> {
    this.users.push(user);
  }

  async findById(id: string): Promise<UserEntityInterface | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async findAll(): Promise<UserEntityInterface[]> {
    return this.users;
  }

  async update(id: string, user: UserEntityInterface): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = user;
  }

  async remove(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }
}
