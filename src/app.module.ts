import { Module } from '@nestjs/common';
import { AlbumModule } from './domain/album/module';
import { ArtistModule } from './domain/artist/module';
import { FavoriteModule } from './domain/favorite/module';
import { TrackModule } from './domain/track/module';
import { UserModule } from './domain/user/module';

@Module({
  imports: [AlbumModule, ArtistModule, FavoriteModule, TrackModule, UserModule],
})
export class AppModule {}
