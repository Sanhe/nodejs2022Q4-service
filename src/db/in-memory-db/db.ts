import { InMemoryUsersDb } from './entities/users.db';
import { Injectable } from '@nestjs/common';
import { InMemoryArtistsDb } from './entities/artists.db';
import DB from '../db';
import { InMemoryTracksDb } from './entities/tracks.db';
import { InMemoryFavoritesDb } from './entities/favorites.db';

@Injectable()
export default class InMemoryDB extends DB {
  users = new InMemoryUsersDb();

  artists = new InMemoryArtistsDb();

  tracks = new InMemoryTracksDb();

  favorites = new InMemoryFavoritesDb();
}
