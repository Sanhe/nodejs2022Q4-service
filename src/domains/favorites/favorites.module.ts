import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DbModule } from '../../db/db.module';

@Module({
  controllers: [FavoritesController],
  imports: [DbModule],
  providers: [FavoritesService],
})
export class FavoritesModule {}
