import { AlbumEntityInterface } from '../interfaces/album.entity.interface';
import { IsInt, IsString, IsUUID } from 'class-validator';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../../common/uuid/config';

export class AlbumEntity implements AlbumEntityInterface {
  @IsString()
  @IsUUID(DEFAULT_UUID_VERSION_NUMBER)
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsInt()
  year: number;

  artistId: string | null; // refers to Artist
}
