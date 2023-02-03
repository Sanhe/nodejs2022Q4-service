import { constants as httpStatus } from 'http2';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { STORAGE_KEY } from '../../db/names.providers';
import DB from '../../db/db';
import { generateUuid } from '../../common/uuid';
import { ArtistEntityInterface } from './interfaces/artist.entity.interface';
import { errorMessages } from './messages/error.messages';
import { DbService } from '../../db/db.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly dbService: DbService) {}

  async create(
    createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntityInterface> {
    const artist = {
      id: generateUuid(),
      ...createArtistDto,
    };

    await this.dbService.db.artists.add(artist);

    return artist;
  }

  async findAll(): Promise<ArtistEntityInterface[]> {
    const artists = await this.dbService.db.artists.findAll();

    return artists;
  }

  async findOne(id: string): Promise<ArtistEntityInterface | undefined> {
    const artist = await this.dbService.db.artists.findById(id);

    if (!artist) {
      throw new HttpException(
        errorMessages.ARTIST_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.dbService.db.artists.findOne(id);

    if (!artist) {
      throw new HttpException(
        errorMessages.ARTIST_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    const updatedArtist = await this.dbService.db.artists.updated(id, artist);

    return updatedArtist;
  }

  async remove(id: string) {
    const artist = await this.dbService.db.artists.findOne(id);

    if (!artist) {
      throw new HttpException(
        errorMessages.ARTIST_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.dbService.db.artists.remove(id);
  }
}
