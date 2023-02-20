import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { generateUuid } from '../../common/uuid';
import { TrackEntityInterface } from './interfaces/track.entity.interface';
import { FavoritesService } from '../favorites/favorites.service';
import { NotInFavoritesError } from '../favorites/errors/not-in-favorites.error';
import { PrismaService } from '../../prisma.service';
import { Track } from '@prisma/client';

@Injectable()
export class TracksService {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = {
      id: generateUuid(),
      ...createTrackDto,
    };

    await this.prismaService.track.create({
      data: track,
    });

    return track;
  }

  async findAll(): Promise<Track[]> {
    const tracks = await this.prismaService.track.findMany();

    return tracks;
  }

  async findOne(id: string): Promise<Track | undefined> {
    const track = await this.prismaService.track.findUnique({
      where: {
        id,
      },
    });

    return track;
  }

  async update(track: TrackEntityInterface, updateTrackDto: UpdateTrackDto) {
    const updatedTrack = await this.prismaService.track.update({
      where: {
        id: track.id,
      },
      data: {
        ...track,
        ...updateTrackDto,
      },
    });

    return updatedTrack;
  }

  async remove(track: Track): Promise<void> {
    await this.prismaService.track.delete({
      where: {
        id: track.id,
      },
    });

    try {
      await this.favoritesService.removeTrack(track.id);
    } catch (error) {
      const isNotInFavoritesError = error instanceof NotInFavoritesError;

      if (!isNotInFavoritesError) {
        throw error;
      }
    }
  }

  async removeAlbumFromTracks(albumId: string): Promise<void> {
    await this.prismaService.track.updateMany({
      where: {
        albumId,
      },
      data: {
        albumId: null,
      },
    });
  }

  async removeArtistFromTracks(artistId: string): Promise<void> {
    await this.prismaService.track.updateMany({
      where: {
        artistId,
      },
      data: {
        artistId: null,
      },
    });
  }
}
