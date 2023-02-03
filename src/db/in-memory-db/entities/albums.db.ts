import AbstractEntity from './abstract-entity.db';
import EntityDbInterface from '../../entity-db.interface';
import { AlbumEntityInterface } from '../../../domains/albums/interfaces/album.entity.interface';

export class InMemoryAlbumsDb
  extends AbstractEntity<AlbumEntityInterface>
  implements EntityDbInterface<AlbumEntityInterface>
{
  protected readonly entities: AlbumEntityInterface[] = [];

  constructor(initialEntities: AlbumEntityInterface[] = []) {
    super();

    this.entities = initialEntities;
  }
}
