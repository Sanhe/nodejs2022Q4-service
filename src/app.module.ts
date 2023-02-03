import { Module } from '@nestjs/common';
import { UsersModule } from './domains/users/users.module';
import { AlbumsModule } from './domains/albums/albums.module';
import { ArtistsModule } from './domains/artists/artists.module';
import { FavoritesModule } from './domains/favorites/favorites.module';
import { TracksModule } from './domains/tracks/tracks.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DEFAULT_ENV_FILES } from './config/defaults';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: DEFAULT_ENV_FILES,
      load: [configuration],
    }),
    DbModule,
    UsersModule,
    AlbumsModule,
    ArtistsModule,
    FavoritesModule,
    TracksModule,
  ],
})
export class AppModule {}
