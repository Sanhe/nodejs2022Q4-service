import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DbModule } from '../../db/db.module';

@Module({
  controllers: [AlbumsController],
  imports: [DbModule],
  providers: [AlbumsService],
})
export class AlbumsModule {}
