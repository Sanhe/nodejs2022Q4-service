import { errorMessages } from '../messages/error.messages';

export class InvalidPasswordError extends Error {
  constructor(message: string = errorMessages.INVALID_PASSWORD) {
    super(message);
  }
}
