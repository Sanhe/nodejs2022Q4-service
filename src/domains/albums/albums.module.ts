import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DbModule } from '../../db/db.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { FavoritesService } from '../favorites/favorites.service';
import { ArtistsModule } from '../artists/artists.module';
import { ArtistExistsConstraint } from '../artists/validators/artist-exists.constraint';
import { ArtistsService } from '../artists/artists.service';
import { AlbumExistsConstraint } from './validators/album-exists.constraint';

@Module({
  controllers: [AlbumsController],
  imports: [DbModule, ArtistsModule, forwardRef(() => FavoritesModule)],
  providers: [
    AlbumsService,
    AlbumExistsConstraint,
    FavoritesService,
    ArtistsService,
    ArtistExistsConstraint,
  ],
  // exports: [AlbumsService, AlbumExistsConstraint],
})
export class AlbumsModule {}
