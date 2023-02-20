import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersPrismaFormatter {
  public formatPrismaUserToUser(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.login = user.login;
    userEntity.password = user.password;
    userEntity.version = user.version;
    userEntity.createdAt = Number(user.createdAt);
    userEntity.updatedAt = Number(user.updatedAt);

    return userEntity;
  }

  public formatPrismaUsersToUsers(users: User[]): UserEntity[] {
    return users.map((user) => this.formatPrismaUserToUser(user));
  }

  public formatUserToPrismaUserCreateInput(
    user: UserEntity,
  ): Prisma.UserCreateInput {
    const prismaUser: Prisma.UserCreateInput = {
      id: user.id,
      login: user.login,
      password: user.password,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return prismaUser;
  }

  public formatUserToPrismaUserUpdateInput(
    user: UserEntity,
  ): Prisma.UserUpdateInput {
    const prismaUser: Prisma.UserUpdateInput = {
      login: user.login,
      password: user.password,
      version: user.version,
      updatedAt: user.updatedAt,
    };

    return prismaUser;
  }
}
