import { Injectable } from '@nestjs/common';
import { UserEntityInterface } from './interfaces/user.entity.interface';
import { OutputUserDtoInterface } from './interfaces/output-user.dto';

@Injectable()
export class UsersFormatter {
  public formatUserToOutput(user: UserEntityInterface): OutputUserDtoInterface {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public formatUsersToOutput(
    users: UserEntityInterface[],
  ): OutputUserDtoInterface[] {
    return users.map((user) => this.formatUserToOutput(user));
  }
}
