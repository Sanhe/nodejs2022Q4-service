import { HttpException, Inject, Injectable } from '@nestjs/common';
import { constants as httpStatus } from 'http2';
import { errorMessages } from './messages/error.messages';
import { getCurrentTimestamp } from '../../common/date';
import { generateUuid } from '../../common/uuid';
import { getCreateEntityVersion } from '../../common/version';
import { CreateUserDtoInterface } from './interfaces/create-user.dto.interface';
import { UpdatePasswordDtoInterface } from './interfaces/update-password.dto.interface';
import { STORAGE_KEY } from '../../db/names.providers';
import { UserEntityInterface } from './interfaces/user.entity.interface';
import { USER_VERSION_INCREMENT } from './users.config';
import DB from '../../db/db';

@Injectable()
export class UsersService {
  constructor(@Inject(STORAGE_KEY) private readonly db: DB) {}

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

    await this.db.users.save(user);

    return user;
  }

  async findAll(): Promise<UserEntityInterface[]> {
    const users = await this.db.users.findAll();

    return users;
  }

  async findOne(id: string): Promise<UserEntityInterface> {
    const user = await this.db.users.findById(id);

    if (!user) {
      throw new HttpException(
        errorMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    return user;
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDtoInterface,
  ): Promise<UserEntityInterface> {
    const user = await this.db.users.findById(id);

    if (!user) {
      throw new HttpException(
        errorMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(
        errorMessages.INVALID_PASSWORD,
        httpStatus.HTTP_STATUS_FORBIDDEN,
      );
    }

    user.password = updatePasswordDto.newPassword;
    user.version += USER_VERSION_INCREMENT;
    user.updatedAt = getCurrentTimestamp();

    await this.db.users.update(user.id, user);

    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.db.users.findById(id);

    if (!user) {
      throw new HttpException(
        errorMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.db.users.remove(user.id);
  }
}
