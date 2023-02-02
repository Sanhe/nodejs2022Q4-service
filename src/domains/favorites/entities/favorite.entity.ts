import { FavoritesInterface } from '../interfaces/favorite.entity.interface';

export class FavoriteEntity implements FavoritesInterface {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
