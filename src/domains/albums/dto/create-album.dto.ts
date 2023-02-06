import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../../common/uuid/config';
import { ArtistExistsConstraint } from '../../artists/validators/artist-exists.constraint';
import { errorMessages } from '../../../common/messages/error.messages';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  year: number;

  @IsOptional()
  @IsString()
  @IsUUID(DEFAULT_UUID_VERSION_NUMBER)
  @Validate(ArtistExistsConstraint, {
    message: errorMessages.ARTIST_DOES_NOT_EXIST,
  })
  artistId: string | null;
}
