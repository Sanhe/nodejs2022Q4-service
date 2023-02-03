import AbstractEntity from './abstract-entity.db';
import EntityDbInterface from '../../entity-db.interface';
import { FavoriteEntityInterface } from '../../../domains/favorites/interfaces/favorite.entity.interface';

export class InMemoryFavoritesDb
  extends AbstractEntity<FavoriteEntityInterface>
  implements EntityDbInterface<FavoriteEntityInterface>
{
  protected readonly entities: FavoriteEntityInterface[] = [];

  constructor(initialEntities: FavoriteEntityInterface[] = []) {
    super();

    this.entities = initialEntities;
  }
}
