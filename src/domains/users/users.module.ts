import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUsersStorage } from './storages/in-memory-users.storage';
import { STORAGE_KEY } from './names.providers';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: STORAGE_KEY,
      useClass: InMemoryUsersStorage,
    },
  ],
})
export class UsersModule {}
