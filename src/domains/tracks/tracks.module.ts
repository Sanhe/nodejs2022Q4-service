import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavoritesModule } from '../favorites/favorites.module';
import { FavoritesService } from '../favorites/favorites.service';
import { ArtistsModule } from '../artists/artists.module';
import { ArtistExistsConstraint } from '../artists/validators/artist-exists.constraint';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsModule } from '../albums/albums.module';
import { AlbumExistsConstraint } from '../albums/validators/album-exists.constraint';
import { AlbumsService } from '../albums/albums.service';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [TracksController],
  imports: [
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
    PrismaService,
  ],
  exports: [TracksService],
})
export class TracksModule {}
