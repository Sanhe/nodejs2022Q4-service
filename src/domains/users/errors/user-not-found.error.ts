import { NotFoundException } from '@nestjs/common';
import { errorMessages } from '../messages/error.messages';

export class UserNotFoundException extends NotFoundException {
  constructor(message: string = errorMessages.USER_NOT_FOUND) {
    super(message);
  }
}
