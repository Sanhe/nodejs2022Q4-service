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

    return artist;
  }

  async update(
    artist: ArtistEntityInterface,
    updateArtistDto: UpdateArtistDto,
  ) {
    const updatedArtist = await this.dbService.db.artists.update(artist.id, {
      ...artist,
      ...updateArtistDto,
    });

    return updatedArtist;
  }

  async remove(artist: ArtistEntityInterface) {
    await this.dbService.db.artists.remove(artist.id);

    const tracks = await this.dbService.db.tracks.findByField(
      'artistId',
      artist.id,
    );

    tracks.forEach(async (track) => {
      await this.dbService.db.tracks.update(track.id, {
        ...track,
        artistId: null,
      });
    });
  }
}
