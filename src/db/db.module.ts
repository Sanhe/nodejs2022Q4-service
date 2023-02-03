import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { STORAGE_KEY } from './names.providers';
import InMemoryDb from './in-memory-db/db';

@Module({
  providers: [
    {
      provide: STORAGE_KEY,
      useClass: InMemoryDb,
    },
    DbService,
  ],
  exports: [DbService],
})
export class DbModule {}
