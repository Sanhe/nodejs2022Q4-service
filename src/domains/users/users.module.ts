import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUsersStorage } from './storages/in-memory-users.storage';
import { STORAGE_KEY } from './names.providers';
import { UsersFormatter } from './users.formatter';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: STORAGE_KEY,
      useClass: InMemoryUsersStorage,
    },
    UsersFormatter,
  ],
})
export class UsersModule {}
