import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoriteService {
  findAll(): string[] {
    return ['Favorite First', 'Favorite Second'];
  }
}
