import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { FavoritesModule } from '../favorites/favorites.module';
import { FavoritesService } from '../favorites/favorites.service';
import { ArtistExistsConstraint } from './validators/artist-exists.constraint';
import { PrismaService } from '../../common/prisma.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { CustomLoggerService } from '../../common/logger/logger.service';

@Module({
  controllers: [ArtistsController],
  imports: [forwardRef(() => FavoritesModule)],
  providers: [
    CustomLoggerService,
    ArtistsService,
    FavoritesService,
    ArtistExistsConstraint,
    PrismaService,
    TracksService,
    AlbumsService,
  ],
})
export class ArtistsModule {}
