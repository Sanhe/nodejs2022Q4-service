import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../../common/uuid/config';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  year: number;

  @IsOptional()
  @IsString()
  @IsUUID(DEFAULT_UUID_VERSION_NUMBER)
  artistId: string | null;
}
