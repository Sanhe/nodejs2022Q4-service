import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DbModule } from '../../db/db.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { FavoritesService } from '../favorites/favorites.service';
import { ArtistExistsConstraint } from './validators/artist-exists.constraint';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [ArtistsController],
  imports: [DbModule, forwardRef(() => FavoritesModule)],
  providers: [
    ArtistsService,
    FavoritesService,
    ArtistExistsConstraint,
    PrismaService,
  ],
})
export class ArtistsModule {}
