import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { constants as httpStatus } from 'http2';
import { UserEntity } from './entities/user.entity';
import { errorMessages } from './messages/error.messages';
import { getCurrentTimestamp } from '../../common/date';
import { generateUuid } from '../../common/uuid';
import { getCreateEntityVersion } from '../../common/version';

@Injectable()
export class UsersService {
  private readonly users: UserEntity[] = [];

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
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

  async findAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException(
        errorMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<void> {
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
