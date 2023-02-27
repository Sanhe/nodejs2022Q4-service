import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { generateUuid } from '../../common/uuid';
import { FavoritesService } from '../favorites/favorites.service';
import { NotInFavoritesError } from '../favorites/errors/not-in-favorites.error';
import { PrismaService } from '../../prisma.service';
import { Album } from '@prisma/client';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly prismaService: PrismaService,
    private readonly tracksService: TracksService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = {
      id: generateUuid(),
      ...createAlbumDto,
    };

    await this.prismaService.album.create({
      data: album,
    });

    return album;
  }

  async findAll(): Promise<Album[]> {
    const albums = await this.prismaService.album.findMany();

    return albums;
  }

  async findOne(id: string): Promise<Album | undefined> {
    const album = await this.prismaService.album.findUnique({
      where: {
        id,
      },
    });

    return album;
  }

  async update(album: Album, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const updatedAlbum = await this.prismaService.album.update({
      where: {
        id: album.id,
      },
      data: {
        ...album,
        ...updateAlbumDto,
      },
    });

    return updatedAlbum;
  }

  async remove(album: Album): Promise<void> {
    await this.prismaService.album.delete({
      where: {
        id: album.id,
      },
    });

    try {
      await this.favoritesService.removeAlbum(album.id);
    } catch (error) {
      const isNotInFavoritesError = error instanceof NotInFavoritesError;

      if (!isNotInFavoritesError) {
        throw error;
      }
    }

    await this.tracksService.removeAlbumFromTracks(album.id);
  }

  async removeArtistFromAlbums(artistId: string): Promise<void> {
    await this.prismaService.album.updateMany({
      where: {
        artistId,
      },
      data: {
        artistId: null,
      },
    });
  }
}
