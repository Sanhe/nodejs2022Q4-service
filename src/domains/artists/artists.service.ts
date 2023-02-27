import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { generateUuid } from '../../common/uuid';
import { FavoritesService } from '../favorites/favorites.service';
import { NotInFavoritesError } from '../favorites/errors/not-in-favorites.error';
import { PrismaService } from '../../prisma.service';
import { Artist } from '@prisma/client';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly prismaService: PrismaService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = {
      id: generateUuid(),
      ...createArtistDto,
    };

    await this.prismaService.artist.create({
      data: artist,
    });

    return artist;
  }

  async findAll(): Promise<Artist[]> {
    const artists = await this.prismaService.artist.findMany();

    return artists;
  }

  async findOne(id: string): Promise<Artist | undefined> {
    const artist = await this.prismaService.artist.findUnique({
      where: {
        id,
      },
    });

    return artist;
  }

  async update(artist: Artist, updateArtistDto: UpdateArtistDto) {
    const updatedArtist = await this.prismaService.artist.update({
      data: {
        ...artist,
        ...updateArtistDto,
      },
      where: {
        id: artist.id,
      },
    });

    return updatedArtist;
  }

  async remove(artist: Artist): Promise<void> {
    await this.prismaService.artist.delete({
      where: {
        id: artist.id,
      },
    });

    try {
      await this.favoritesService.removeArtist(artist.id);
    } catch (error) {
      const isNotInFavoritesError = error instanceof NotInFavoritesError;

      if (!isNotInFavoritesError) {
        throw error;
      }
    }

    await this.tracksService.removeArtistFromTracks(artist.id);

    await this.albumsService.removeArtistFromAlbums(artist.id);
  }
}
