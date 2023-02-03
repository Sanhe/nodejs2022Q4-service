import { FavoriteEntityInterface } from '../interfaces/favorite.entity.interface';

export class FavoriteEntity implements FavoriteEntityInterface {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
