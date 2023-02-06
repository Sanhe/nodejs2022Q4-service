import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import { OutputFavoritesDto } from './dto/output-favorites.dto';
import { generateUuid } from '../../common/uuid';
import { FavoriteEntity } from './entities/favorite.entity';
import { NotInFavoritesError } from './errors/not-in-favorites.error';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DbService) {}

  async findAll(): Promise<OutputFavoritesDto> {
    const favorites = await this.dbService.db.favorites.findAll();

    if (!favorites) {
      return new OutputFavoritesDto();
    }

    const favorite = favorites[0];
    const artists = await this.dbService.db.artists.findByIds(favorite.artists);
    const albums = await this.dbService.db.albums.findByIds(favorite.albums);
    const tracks = await this.dbService.db.tracks.findByIds(favorite.tracks);

    const outputFavorites = new OutputFavoritesDto(artists, albums, tracks);

    return outputFavorites;
  }

  async createEmptyFavorite(): Promise<FavoriteEntity> {
    const favorite = {
      id: generateUuid(),
      artists: [],
      albums: [],
      tracks: [],
    };

    await this.dbService.db.favorites.add(favorite);

    return favorite;
  }

  async getFavorite(): Promise<FavoriteEntity> {
    let favorites = await this.dbService.db.favorites.findAll();

    if (!favorites) {
      favorites = await this.createEmptyFavorite();
    }

    return favorites[0];
  }

  async addTrack(trackId: string) {
    const favorite = await this.getFavorite();

    await this.dbService.db.favorites.update(favorite.id, {
      ...favorite,
      tracks: [...favorite.tracks, trackId],
    });
  }

  async removeTrack(trackId: string) {
    const favorite = await this.getFavorite();

    const favoriteTrackIndex = favorite.tracks.findIndex(
      (id) => id === trackId,
    );

    if (favoriteTrackIndex === -1) {
      throw new NotInFavoritesError();
    }

    favorite.tracks.splice(favoriteTrackIndex, 1);

    await this.dbService.db.favorites.update(favorite.id, {
      ...favorite,
      tracks: favorite.tracks,
    });
  }

  async addAlbum(albumId: string) {
    const favorite = await this.getFavorite();

    await this.dbService.db.favorites.update(favorite.id, {
      ...favorite,
      albums: [...favorite.albums, albumId],
    });
  }

  async removeAlbum(albumId: string) {
    const favorite = await this.getFavorite();

    const favoriteAlbumIndex = favorite.albums.findIndex(
      (id) => id === albumId,
    );

    if (favoriteAlbumIndex === -1) {
      throw new NotInFavoritesError();
    }

    favorite.albums.splice(favoriteAlbumIndex, 1);

    await this.dbService.db.favorites.update(favorite.id, {
      ...favorite,
      albums: favorite.albums,
    });
  }

  async addArtist(artistId: string) {
    const favorite = await this.getFavorite();

    await this.dbService.db.favorites.update(favorite.id, {
      ...favorite,
      artists: [...favorite.artists, artistId],
    });
  }

  async removeArtist(artistId: string) {
    const favorite = await this.getFavorite();

    const favoriteArtistIndex = favorite.artists.findIndex(
      (id) => id === artistId,
    );

    if (favoriteArtistIndex === -1) {
      throw new NotInFavoritesError();
    }

    favorite.artists.splice(favoriteArtistIndex, 1);

    await this.dbService.db.favorites.update(favorite.id, {
      ...favorite,
      artists: favorite.artists,
    });
  }
}
