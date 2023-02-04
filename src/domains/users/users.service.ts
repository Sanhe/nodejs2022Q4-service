import { Injectable } from '@nestjs/common';
import { getCurrentTimestamp } from '../../common/date';
import { generateUuid } from '../../common/uuid';
import { getCreateEntityVersion } from '../../common/version';
import { CreateUserDtoInterface } from './interfaces/create-user.dto.interface';
import { UpdatePasswordDtoInterface } from './interfaces/update-password.dto.interface';
import { UserEntityInterface } from './interfaces/user.entity.interface';
import { USER_VERSION_INCREMENT } from './users.config';
import { DbService } from '../../db/db.service';
import { InvalidPasswordError } from './errors/invalid-password.error';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}

  async create(
    createUserDto: CreateUserDtoInterface,
  ): Promise<UserEntityInterface> {
    const currentTimestamp = getCurrentTimestamp();

    const user = {
      id: generateUuid(),
      ...createUserDto,
      version: getCreateEntityVersion(),
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };

    await this.dbService.db.users.add(user);

    return user;
  }

  async findAll(): Promise<UserEntityInterface[]> {
    const users = await this.dbService.db.users.findAll();

    return users;
  }

  async findOne(id: string): Promise<UserEntityInterface | undefined> {
    const user = await this.dbService.db.users.findById(id);

    return user;
  }

  async updatePassword(
    user: UserEntityInterface,
    updatePasswordDto: UpdatePasswordDtoInterface,
  ): Promise<UserEntityInterface> {
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new InvalidPasswordError();
    }

    user.password = updatePasswordDto.newPassword;
    user.version += USER_VERSION_INCREMENT;
    user.updatedAt = getCurrentTimestamp();

    const updatedUser = await this.dbService.db.users.update(user.id, user);

    return updatedUser;
  }

  async remove(user: UserEntityInterface): Promise<void> {
    await this.dbService.db.users.remove(user.id);
  }
}
