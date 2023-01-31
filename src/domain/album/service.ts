import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumService {
  findAll() {
    return ['Album First', 'Album Second'];
  }
}
