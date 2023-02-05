import AbstractEntity from './abstract-entity.db';
import EntityDbInterface from '../../entity-db.interface';
import { ArtistEntityInterface } from '../../../domains/artists/interfaces/artist.entity.interface';

export class InMemoryArtistsDb
  extends AbstractEntity<ArtistEntityInterface>
  implements EntityDbInterface<ArtistEntityInterface>
{
  protected readonly entities: ArtistEntityInterface[] = [];

  constructor(initialEntities: ArtistEntityInterface[] = []) {
    super();

    this.entities = initialEntities;
  }
}
