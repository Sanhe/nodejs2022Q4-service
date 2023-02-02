import { ArtistEntityInterface } from '../interfaces/artist.entity.interface';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../../common/uuid/config';

export class ArtistEntity implements ArtistEntityInterface {
  @IsString()
  @IsUUID(DEFAULT_UUID_VERSION_NUMBER)
  id: string; // uuid v4

  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
