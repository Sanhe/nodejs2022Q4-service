import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { generateUuid } from '../../common/uuid';
import { FavoritesService } from '../favorites/favorites.service';
import { NotInFavoritesError } from '../favorites/errors/not-in-favorites.error';
import { PrismaService } from '../../prisma.service';
import { Album } from '@prisma/client';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly prismaService: PrismaService,
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

    // TODO: update this code to use Prisma
    // try {
    //   await this.favoritesService.removeAlbum(album.id);
    // } catch (error) {
    //   const isNotInFavoritesError = error instanceof NotInFavoritesError;
    //
    //   if (!isNotInFavoritesError) {
    //     throw error;
    //   }
    // }
    //
    // const tracks = await this.dbService.db.tracks.findByField(
    //   'albumId',
    //   album.id,
    // );
    //
    // tracks.forEach(async (track) => {
    //   await this.dbService.db.tracks.update(track.id, {
    //     ...track,
    //     albumId: null,
    //   });
    // });
  }
}
