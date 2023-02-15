import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from '../../db/db.service';
import { generateUuid } from '../../common/uuid';
import { TrackEntityInterface } from './interfaces/track.entity.interface';
import { FavoritesService } from '../favorites/favorites.service';
import { NotInFavoritesError } from '../favorites/errors/not-in-favorites.error';

@Injectable()
export class TracksService {
  constructor(
    private readonly dbService: DbService,
    private readonly favoritesService: FavoritesService,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntityInterface> {
    const track = {
      id: generateUuid(),
      ...createTrackDto,
    };

    await this.dbService.db.tracks.add(track);

    return track;
  }

  async findAll(): Promise<TrackEntityInterface[]> {
    const tracks = await this.dbService.db.tracks.findAll();

    return tracks;
  }

  async findOne(id: string): Promise<TrackEntityInterface | undefined> {
    const track = await this.dbService.db.tracks.findById(id);

    return track;
  }

  async update(track: TrackEntityInterface, updateTrackDto: UpdateTrackDto) {
    const updatedTrack = await this.dbService.db.tracks.update(track.id, {
      ...track,
      ...updateTrackDto,
    });

    return updatedTrack;
  }

  async remove(track: TrackEntityInterface): Promise<void> {
    await this.dbService.db.tracks.remove(track.id);

    try {
      await this.favoritesService.removeTrack(track.id);
    } catch (error) {
      const isNotInFavoritesError = error instanceof NotInFavoritesError;

      if (!isNotInFavoritesError) {
        throw error;
      }
    }
  }
}
