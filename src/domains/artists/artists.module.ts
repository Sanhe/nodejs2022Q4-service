import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { STORAGE_KEY } from '../../db/names.providers';
import InMemoryDb from '../../db/in-memory-db/db';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    {
      provide: STORAGE_KEY,
      useClass: InMemoryDb,
    },
  ],
})
export class ArtistsModule {}
