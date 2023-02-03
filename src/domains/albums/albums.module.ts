import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { STORAGE_KEY } from '../../db/names.providers';
import InMemoryDb from '../../db/in-memory-db/db';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: STORAGE_KEY,
      useClass: InMemoryDb,
    },
  ],
})
export class AlbumsModule {}
