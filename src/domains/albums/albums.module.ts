import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavoritesModule } from '../favorites/favorites.module';
import { FavoritesService } from '../favorites/favorites.service';
import { ArtistsModule } from '../artists/artists.module';
import { ArtistExistsConstraint } from '../artists/validators/artist-exists.constraint';
import { ArtistsService } from '../artists/artists.service';
import { AlbumExistsConstraint } from './validators/album-exists.constraint';
import { PrismaService } from '../../common/prisma.service';
import { TracksService } from '../tracks/tracks.service';
import { CustomLoggerService } from '../../common/logger/logger.service';

@Module({
  controllers: [AlbumsController],
  imports: [ArtistsModule, forwardRef(() => FavoritesModule)],
  providers: [
    CustomLoggerService,
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
