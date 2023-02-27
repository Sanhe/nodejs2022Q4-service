import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersFormatter } from './users.formatter';
import { PrismaService } from '../../prisma.service';
import { UsersPrismaFormatter } from './users.prisma.formatter';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersFormatter,
    PrismaService,
    UsersPrismaFormatter,
  ],
})
export class UsersModule {}
