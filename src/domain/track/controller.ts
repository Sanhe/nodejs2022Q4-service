import { Controller, Get } from '@nestjs/common';
import { TrackService } from './service';

@Controller('tracks')
export class TrackController {
  constructor(private readonly userService: TrackService) {}

  @Get()
  findAll() {
    const tracks = this.userService.findAll();

    return tracks;
  }
}
