import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { STORAGE_KEY } from '../../db/names.providers';
import InMemoryDb from '../../db/in-memory-db/db';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: STORAGE_KEY,
      useClass: InMemoryDb,
    },
  ],
})
export class FavoritesModule {}
