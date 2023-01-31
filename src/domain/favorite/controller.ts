import { Controller, Get } from '@nestjs/common';
import { FavoriteService } from './service';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly userService: FavoriteService) {}

  @Get()
  findAll() {
    const favorites = this.userService.findAll();

    return favorites;
  }
}
