import { HttpException, Inject, Injectable } from '@nestjs/common';
import { constants as httpStatus } from 'http2';
import { UserEntity } from './entities/user.entity';
import { errorMessages } from './messages/error.messages';
import { getCurrentTimestamp } from '../../common/date';
import { generateUuid } from '../../common/uuid';
import { getCreateEntityVersion } from '../../common/version';
import { UsersStorageInterface } from './interfaces/users-storage.interface';
import { CreateUserDtoInterface } from './interfaces/create-user.dto.interface';
import { UpdatePasswordDtoInterface } from './interfaces/update-password.dto.interface';
import { STORAGE_KEY } from './names.providers';

@Injectable()
export class UsersService {
  constructor(@Inject(STORAGE_KEY) private storage: UsersStorageInterface) {}

  async create(createUserDto: CreateUserDtoInterface): Promise<UserEntity> {
    const currentTimestamp = getCurrentTimestamp();
    const user = {
      id: generateUuid(),
      ...createUserDto,
      version: getCreateEntityVersion(),
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };

    await this.storage.save(user);

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.storage.findAll();
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = this.storage.findById(id);

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
  ): Promise<void> {
    const user = await this.storage.findById(id);

    if (!user) {
      throw new HttpException(
        errorMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    user.password = updatePasswordDto.newPassword;

    await this.storage.update(user.id, user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.storage.findById(id);

    if (!user) {
      throw new HttpException(
        errorMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.storage.remove(user.id);
  }
}
