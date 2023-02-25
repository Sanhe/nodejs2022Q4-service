import { Injectable } from '@nestjs/common';
import { getCurrentTimestamp } from '../../common/date';
import { generateUuid } from '../../common/uuid';
import { getCreateEntityVersion } from '../../common/version';
import { CreateUserDtoInterface } from './interfaces/create-user.dto.interface';
import { UpdatePasswordDtoInterface } from './interfaces/update-password.dto.interface';
import { USER_VERSION_INCREMENT } from './users.config';
import { InvalidPasswordError } from './errors/invalid-password.error';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from '../../common/prisma.service';
import { Prisma } from '@prisma/client';
import { UsersPrismaFormatter } from './users.prisma.formatter';
import { CustomLoggerService } from '../../common/logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersPrismaFormater: UsersPrismaFormatter,
    private readonly logger: CustomLoggerService,
  ) {
    this.logger.setContext(UsersService.name);
  }

  async create(createUserDto: CreateUserDtoInterface): Promise<UserEntity> {
    const currentTimestamp = getCurrentTimestamp();

    this.logger.log('Create user');

    const user: UserEntity = {
      id: generateUuid(),
      ...createUserDto,
      version: getCreateEntityVersion(),
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };

    const data: Prisma.UserCreateInput =
      this.usersPrismaFormater.formatUserToPrismaUserCreateInput(user);

    await this.prisma.user.create({
      data,
    });

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const prismaUsers = await this.prisma.user.findMany();

    this.logger.log('Find all users');

    // TODO: Remove this test code
    this.logger.error('Test error');
    throw new Error('test');

    const users: UserEntity[] =
      this.usersPrismaFormater.formatPrismaUsersToUsers(prismaUsers);

    return users;
  }

  async findOne(id: string): Promise<UserEntity | undefined> {
    const prismaUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!prismaUser) {
      return undefined;
    }

    const user: UserEntity =
      this.usersPrismaFormater.formatPrismaUserToUser(prismaUser);

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

    const data: Prisma.UserUpdateInput =
      this.usersPrismaFormater.formatUserToPrismaUserUpdateInput(user);

    await this.prisma.user.update({
      data,
      where: {
        id: user.id,
      },
    });

    return user;
  }

  async remove(user: UserEntity): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}
