import { ArtistEntityInterface } from '../../artists/interfaces/artist.entity.interface';
import { AlbumEntityInterface } from '../../albums/interfaces/album.entity.interface';
import { TrackEntityInterface } from '../../tracks/interfaces/track.entity.interface';

export class OutputFavoritesDto {
  artists: ArtistEntityInterface[];

  albums: AlbumEntityInterface[];

  tracks: TrackEntityInterface[];

  constructor(
    artists: ArtistEntityInterface[] = [],
    albums: AlbumEntityInterface[] = [],
    tracks: TrackEntityInterface[] = [],
  ) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
