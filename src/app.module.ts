import { Module } from '@nestjs/common';
import { UsersModule } from './domains/users/users.module';
import { AlbumsModule } from './domains/albums/albums.module';
import { ArtistsModule } from './domains/artists/artists.module';
import { FavoritesModule } from './domains/favorites/favorites.module';
import { TracksModule } from './domains/tracks/tracks.module';

@Module({
  imports: [
    UsersModule,
    AlbumsModule,
    ArtistsModule,
    FavoritesModule,
    TracksModule,
  ],
})
export class AppModule {}
