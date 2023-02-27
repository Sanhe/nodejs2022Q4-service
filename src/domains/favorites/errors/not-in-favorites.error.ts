import { errorMessages } from '../../../common/messages/error.messages';

export class NotInFavoritesError extends Error {
  constructor(message: string = errorMessages.NOT_IN_FAVORITES) {
    super(message);
  }
}
