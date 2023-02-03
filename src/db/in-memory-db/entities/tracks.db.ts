import AbstractEntity from './abstract-entity.db';
import EntityDbInterface from '../../entity-db.interface';
import { TrackEntityInterface } from '../../../domains/tracks/interfaces/track.entity.interface';

export class InMemoryTracksDb
  extends AbstractEntity<TrackEntityInterface>
  implements EntityDbInterface<TrackEntityInterface>
{
  protected readonly entities: TrackEntityInterface[] = [];
}
