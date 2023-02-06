import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DbModule } from '../../db/db.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  controllers: [AlbumsController],
  imports: [DbModule, forwardRef(() => FavoritesModule)],
  providers: [AlbumsService, FavoritesService],
})
export class AlbumsModule {}
