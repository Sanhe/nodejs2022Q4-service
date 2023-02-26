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
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { RefreshAuthGuard } from './guards/refresh.auth.guard';

@Module({
  imports: [UsersModule, PassportModule, LoggerModule, JwtModule],
  providers: [
    AuthService,
    LocalStrategy,
    CustomLoggerService,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    RefreshStrategy,
    RefreshAuthGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
