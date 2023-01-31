import { Module } from '@nestjs/common';
import { FavoriteController } from './controller';
import { FavoriteService } from './service';

@Module({
  imports: [],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
