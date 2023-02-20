import { errorMessages } from '../../../common/messages/error.messages';

export class AlreadyInFavoritesError extends Error {
  constructor(message: string = errorMessages.ALREADY_IN_FAVORITES) {
    super(message);
  }
}
