import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DbModule } from '../../db/db.module';
import { TracksService } from '../tracks/tracks.service';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [FavoritesController],
  imports: [
    DbModule,
    forwardRef(() => TracksModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
  ],
  providers: [
    FavoritesService,
    TracksService,
    ArtistsService,
    AlbumsService,
    PrismaService,
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
