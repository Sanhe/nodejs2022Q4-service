import { Album, Artist, Track } from '@prisma/client';

export class OutputFavoritesDto {
  artists: Artist[];

  albums: Album[];

  tracks: Track[];

  constructor(
    artists: Artist[] = [],
    albums: Album[] = [],
    tracks: Track[] = [],
  ) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
