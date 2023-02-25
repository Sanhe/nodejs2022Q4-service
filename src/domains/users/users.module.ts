import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersFormatter } from './users.formatter';
import { PrismaService } from '../../common/prisma.service';
import { UsersPrismaFormatter } from './users.prisma.formatter';
import { CustomLoggerService } from '../../common/logger/logger.service';

@Module({
  controllers: [UsersController],
  providers: [
    CustomLoggerService,
    UsersService,
    UsersFormatter,
    PrismaService,
    UsersPrismaFormatter,
  ],
})
export class UsersModule {}
