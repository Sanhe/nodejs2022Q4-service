import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistService {
  findAll() {
    return ['Artist First', 'Artist Second'];
  }
}
