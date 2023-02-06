import { Injectable } from '@nestjs/common';
import { UserEntityInterface } from './interfaces/user.entity.interface';
import { OutputUserDtoInterface } from './interfaces/output-user.dto';
import { OutputUserDto } from './dtos/output-user.dto';

@Injectable()
export class UsersFormatter {
  public formatUserToOutput(user: UserEntityInterface): OutputUserDto {
    return new OutputUserDto(user);
  }

  public formatUsersToOutput(
    users: UserEntityInterface[],
  ): OutputUserDtoInterface[] {
    return users.map((user) => this.formatUserToOutput(user));
  }
}
