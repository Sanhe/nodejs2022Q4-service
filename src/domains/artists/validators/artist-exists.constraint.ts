import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ArtistsService } from '../artists.service';

@ValidatorConstraint({ name: 'ArtistExists', async: true })
@Injectable()
export class ArtistExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly artistsService: ArtistsService) {}

  async validate(artistId: string): Promise<boolean> {
    const artist = await this.artistsService.findOne(artistId);

    return !!artist;
  }
}
