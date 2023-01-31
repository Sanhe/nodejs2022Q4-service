import { Controller, Get } from '@nestjs/common';
import { ArtistService } from './service';

@Controller('artists')
export class ArtistController {
  constructor(private readonly userService: ArtistService) {}

  @Get()
  findAll() {
    const artists = this.userService.findAll();

    return artists;
  }
}
