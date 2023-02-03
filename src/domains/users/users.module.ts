import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersFormatter } from './users.formatter';
import { STORAGE_KEY } from '../../db/names.providers';
import InMemoryDb from '../../db/in-memory-db/db';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: STORAGE_KEY,
      useClass: InMemoryDb,
    },
    UsersFormatter,
  ],
})
export class UsersModule {}
