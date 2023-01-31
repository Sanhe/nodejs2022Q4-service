import { constants as httpStatus } from 'node:http2';
import { HttpException, Injectable } from '@nestjs/common';
import { User } from './interface';
import { USERS_MOCK } from './mock';
import { errorMessages } from './error.message';
import { CreateUserDto } from './dto/createUserDto';
import { generateUuid } from '../../common/uuid';
import { getCreateEntityVersion } from '../../common/version';
import { getCurrentTimestamp } from '../../common/date';

@Injectable()
export class UserService {
  private readonly users: User[] = USERS_MOCK;

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException(
        errorMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const currentTimestamp = getCurrentTimestamp();
    const user = {
      id: generateUuid(),
      ...createUserDto,
      version: getCreateEntityVersion(),
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };

    this.users.push(user);

    return user;
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new HttpException(
        errorMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    this.users.splice(index, 1);
  }
}
