import { Module } from '@nestjs/common';
import { TrackController } from './controller';
import { TrackService } from './service';

@Module({
  imports: [],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
