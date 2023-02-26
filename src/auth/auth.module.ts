import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../domains/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LoggerModule } from '../common/logger/logger.module';
import { CustomLoggerService } from '../common/logger/logger.service';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, PassportModule, LoggerModule, JwtModule],
  providers: [AuthService, LocalStrategy, CustomLoggerService, LocalAuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
