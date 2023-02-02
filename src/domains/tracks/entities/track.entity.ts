import { IsInt, IsString, IsUUID } from 'class-validator';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../../common/uuid/config';
import { TrackEntityInterface } from '../interfaces/track.entity.interface';

export class TrackEntity implements TrackEntityInterface {
  @IsString()
  @IsUUID(DEFAULT_UUID_VERSION_NUMBER)
  id: string; // uuid v4

  @IsString()
  name: string;

  artistId: string | null; // refers to Artist

  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}
