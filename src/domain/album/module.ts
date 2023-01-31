import { Module } from '@nestjs/common';
import { AlbumController } from './controller';
import { AlbumService } from './service';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
