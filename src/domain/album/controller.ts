import { Controller, Get } from '@nestjs/common';
import { AlbumService } from './service';

@Controller('albums')
export class AlbumController {
  constructor(private readonly userService: AlbumService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
