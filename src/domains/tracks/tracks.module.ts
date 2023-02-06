import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DbModule } from '../../db/db.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { FavoritesService } from '../favorites/favorites.service';
import { ArtistsModule } from '../artists/artists.module';
import { ArtistExistsConstraint } from '../artists/validators/artist-exists.constraint';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsModule } from '../albums/albums.module';
import { AlbumExistsConstraint } from '../albums/validators/album-exists.constraint';
import { AlbumsService } from '../albums/albums.service';

@Module({
  controllers: [TracksController],
  imports: [
    DbModule,
    ArtistsModule,
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
  ],
  providers: [
    TracksService,
    ArtistExistsConstraint,
    ArtistsService,
    AlbumExistsConstraint,
    AlbumsService,
    FavoritesService,
  ],
  exports: [TracksService],
})
export class TracksModule {}
