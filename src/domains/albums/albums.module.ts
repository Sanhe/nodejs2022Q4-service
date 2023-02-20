import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavoritesModule } from '../favorites/favorites.module';
import { FavoritesService } from '../favorites/favorites.service';
import { ArtistsModule } from '../artists/artists.module';
import { ArtistExistsConstraint } from '../artists/validators/artist-exists.constraint';
import { ArtistsService } from '../artists/artists.service';
import { AlbumExistsConstraint } from './validators/album-exists.constraint';
import { PrismaService } from '../../prisma.service';
import { TracksService } from '../tracks/tracks.service';

@Module({
  controllers: [AlbumsController],
  imports: [ArtistsModule, forwardRef(() => FavoritesModule)],
  providers: [
    AlbumsService,
    AlbumExistsConstraint,
    FavoritesService,
    ArtistsService,
    ArtistExistsConstraint,
    PrismaService,
    TracksService,
  ],
})
export class AlbumsModule {}
