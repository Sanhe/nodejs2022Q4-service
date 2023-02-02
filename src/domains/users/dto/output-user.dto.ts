import { OutputUserDtoInterface } from '../interfaces/output-user.dto';

export class OutputUserDto implements OutputUserDtoInterface {
  readonly id: string;
  readonly login: string;
  readonly version: number;
  readonly createdAt: number;
  readonly updatedAt: number;
}
