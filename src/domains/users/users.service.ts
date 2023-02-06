import { Injectable } from '@nestjs/common';
import { getCurrentTimestamp } from '../../common/date';
import { generateUuid } from '../../common/uuid';
import { getCreateEntityVersion } from '../../common/version';
import { CreateUserDtoInterface } from './interfaces/create-user.dto.interface';
import { UpdatePasswordDtoInterface } from './interfaces/update-password.dto.interface';
import { USER_VERSION_INCREMENT } from './users.config';
import { DbService } from '../../db/db.service';
import { InvalidPasswordError } from './errors/invalid-password.error';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}

  async create(createUserDto: CreateUserDtoInterface): Promise<UserEntity> {
    const currentTimestamp = getCurrentTimestamp();

    const userData: UserEntity = {
      id: generateUuid(),
      ...createUserDto,
      version: getCreateEntityVersion(),
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };

    const user = new UserEntity();

    Object.assign(user, userData);

    await this.dbService.db.users.add(user);

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.dbService.db.users.findAll();

    return users;
  }

  async findOne(id: string): Promise<UserEntity | undefined> {
    const user = await this.dbService.db.users.findById(id);

    return user;
  }

  async updatePassword(
    user: UserEntity,
    updatePasswordDto: UpdatePasswordDtoInterface,
  ): Promise<UserEntity> {
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new InvalidPasswordError();
    }

    user.password = updatePasswordDto.newPassword;
    user.version += USER_VERSION_INCREMENT;
    user.updatedAt = getCurrentTimestamp();

    const updatedUser = await this.dbService.db.users.update(user.id, user);

    return updatedUser;
  }

  async remove(user: UserEntity): Promise<void> {
    await this.dbService.db.users.remove(user.id);
  }
}
