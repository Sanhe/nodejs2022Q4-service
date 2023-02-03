import AbstractEntity from './abstract-entity.db';
import EntityDbInterface from '../../entity-db.interface';
import { UserEntityInterface } from '../../../domains/users/interfaces/user.entity.interface';

export class InMemoryUsersDb
  extends AbstractEntity<UserEntityInterface>
  implements EntityDbInterface<UserEntityInterface>
{
  protected readonly entities: UserEntityInterface[] = [];
}
