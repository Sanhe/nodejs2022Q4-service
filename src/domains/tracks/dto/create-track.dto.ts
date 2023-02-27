import { IsInt, IsOptional, IsString, IsUUID, Validate } from 'class-validator';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../../common/uuid/config';
import { ArtistExistsConstraint } from '../../artists/validators/artist-exists.constraint';
import { errorMessages } from '../../../common/messages/error.messages';
import { AlbumExistsConstraint } from '../../albums/validators/album-exists.constraint';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsUUID(DEFAULT_UUID_VERSION_NUMBER)
  @Validate(ArtistExistsConstraint, {
    message: errorMessages.ARTIST_DOES_NOT_EXIST,
  })
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsString()
  @IsUUID(DEFAULT_UUID_VERSION_NUMBER)
  @Validate(AlbumExistsConstraint, {
    message: errorMessages.ALBUM_DOES_NOT_EXIST,
  })
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}
