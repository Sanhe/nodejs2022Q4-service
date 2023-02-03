import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DbModule } from '../../db/db.module';

@Module({
  controllers: [TracksController],
  imports: [DbModule],
  providers: [TracksService],
})
export class TracksModule {}
