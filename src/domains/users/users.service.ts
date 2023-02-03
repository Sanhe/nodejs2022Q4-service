import { constants as httpStatus } from 'http2';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { errorMessages } from './messages/error.messages';
import { getCurrentTimestamp } from '../../common/date';
import { generateUuid } from '../../common/uuid';
import { getCreateEntityVersion } from '../../common/version';
import { CreateUserDtoInterface } from './interfaces/create-user.dto.interface';
import { UpdatePasswordDtoInterface } from './interfaces/update-password.dto.interface';
import { UserEntityInterface } from './interfaces/user.entity.interface';
import { USER_VERSION_INCREMENT } from './users.config';
import { DbService } from '../../db/db.service';

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

  async findOne(id: string): Promise<UserEntityInterface> {
    const user = await this.dbService.db.users.findById(id);

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
    const user = await this.dbService.db.users.findById(id);

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

    const updatedUser = await this.dbService.db.users.update(user.id, user);

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const user = await this.dbService.db.users.findById(id);

    if (!user) {
      throw new HttpException(
        errorMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.dbService.db.users.remove(user.id);
  }
}
