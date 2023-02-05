import { FavoriteEntityInterface } from '../interfaces/favorite.entity.interface';
import { IsString, IsUUID } from 'class-validator';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../../common/uuid/config';

export class FavoriteEntity implements FavoriteEntityInterface {
  @IsString()
  @IsUUID(DEFAULT_UUID_VERSION_NUMBER)
  id: string;

  artists: string[]; // favorite artists ids

  albums: string[]; // favorite albums ids

  tracks: string[]; // favorite tracks ids
}
