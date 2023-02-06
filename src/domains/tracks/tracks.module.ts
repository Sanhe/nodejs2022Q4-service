import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DbModule } from '../../db/db.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  controllers: [TracksController],
  imports: [DbModule, forwardRef(() => FavoritesModule)],
  providers: [TracksService, FavoritesService],
  exports: [TracksService],
})
export class TracksModule {}
