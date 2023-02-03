import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { STORAGE_KEY } from '../../db/names.providers';
import InMemoryDb from '../../db/in-memory-db/db';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: STORAGE_KEY,
      useClass: InMemoryDb,
    },
  ],
})
export class TracksModule {}
