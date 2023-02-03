import { InMemoryUsersDb } from './entities/users.db';
import { Injectable } from '@nestjs/common';
import { InMemoryArtistsDb } from './entities/artists.db';
import DB from '../db';
import { InMemoryTracksDb } from './entities/tracks.db';
import { InMemoryFavoritesDb } from './entities/favorites.db';
import { ConfigService } from '@nestjs/config';
import { CONFIG_USE_INITIAL_DATA } from '../../config/defaults';
import {
  albumsMock,
  artistsMock,
  favoritesMock,
  tracksMock,
  usersMock,
} from '../mock-data';
import { InMemoryAlbumsDb } from './entities/albums.db';

@Injectable()
export default class InMemoryDB extends DB {
  users: InMemoryUsersDb;

  artists: InMemoryArtistsDb;

  tracks: InMemoryTracksDb;

  albums: InMemoryAlbumsDb;

  favorites: InMemoryFavoritesDb;

  constructor(configService: ConfigService) {
    super();

    const useInitialData = configService.get(CONFIG_USE_INITIAL_DATA);
    let initialUsers = [];
    let initialArtists = [];
    let initialTracks = [];
    let initialAlbums = [];
    let initialFavorites = [];

    if (useInitialData) {
      initialUsers = usersMock();
      initialArtists = artistsMock();
      initialTracks = tracksMock();
      initialAlbums = albumsMock();
      initialFavorites = favoritesMock();
    }

    this.users = new InMemoryUsersDb(initialUsers);
    this.artists = new InMemoryArtistsDb(initialArtists);
    this.tracks = new InMemoryTracksDb(initialTracks);
    this.albums = new InMemoryAlbumsDb(initialAlbums);
    this.favorites = new InMemoryFavoritesDb(initialFavorites);
  }
}
