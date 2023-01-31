import { Module } from '@nestjs/common';
import { ArtistService } from './service';
import { ArtistController } from './controller';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
