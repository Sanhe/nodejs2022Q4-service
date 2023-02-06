import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { AlbumsService } from '../albums.service';

@ValidatorConstraint({ name: 'AlbumExists', async: true })
@Injectable()
export class AlbumExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly albumsService: AlbumsService) {}

  async validate(albumId: string): Promise<boolean> {
    const album = await this.albumsService.findOne(albumId);

    return !!album;
  }
}
