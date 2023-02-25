import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksService } from '../tracks/tracks.service';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { PrismaService } from '../../common/prisma.service';
import { CustomLoggerService } from '../../common/logger/logger.service';

@Module({
  controllers: [FavoritesController],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
  ],
  providers: [
    CustomLoggerService,
    FavoritesService,
    TracksService,
    ArtistsService,
    AlbumsService,
    PrismaService,
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
