import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './domains/users/users.module';
import { AlbumsModule } from './domains/albums/albums.module';
import { ArtistsModule } from './domains/artists/artists.module';
import { FavoritesModule } from './domains/favorites/favorites.module';
import { TracksModule } from './domains/tracks/tracks.module';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/configuration.module';
import { PrismaService } from './common/prisma.service';
import { LoggerModule } from './common/logger/logger.module';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule,
    ConfigurationModule,
    UsersModule,
    AlbumsModule,
    ArtistsModule,
    TracksModule,
    FavoritesModule,
  ],
  providers: [AppService, PrismaService],
  exports: [AppService, PrismaService],
})
// implements NestModule
export class AppModule {
  // configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply(LoggerMiddleware).forRoutes('*');
  // }
}
