import AbstractEntity from './abstract-entity.db';
import EntityDbInterface from '../../entity-db.interface';
import { TrackEntityInterface } from '../../../domains/tracks/interfaces/track.entity.interface';
import { UserEntityInterface } from '../../../domains/users/interfaces/user.entity.interface';

export class InMemoryTracksDb
  extends AbstractEntity<TrackEntityInterface>
  implements EntityDbInterface<TrackEntityInterface>
{
  protected readonly entities: TrackEntityInterface[] = [];

  constructor(initialEntities: TrackEntityInterface[] = []) {
    super();

    this.entities = initialEntities;
  }
}
