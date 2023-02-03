import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DbModule } from '../../db/db.module';

@Module({
  controllers: [ArtistsController],
  imports: [DbModule],
  providers: [ArtistsService],
})
export class ArtistsModule {}
