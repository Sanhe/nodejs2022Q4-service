import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackService {
  findAll(): string[] {
    return ['Track First', 'Track Second'];
  }
}
