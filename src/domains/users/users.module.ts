import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersFormatter } from './users.formatter';
import { DbModule } from '../../db/db.module';

@Module({
  controllers: [UsersController],
  imports: [DbModule],
  providers: [UsersService, UsersFormatter],
})
export class UsersModule {}
