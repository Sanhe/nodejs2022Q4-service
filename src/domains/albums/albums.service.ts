import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from '../../db/db.service';
import { AlbumEntityInterface } from './interfaces/album.entity.interface';
import { generateUuid } from '../../common/uuid';
import { FavoritesService } from '../favorites/favorites.service';
import { NotInFavoritesError } from '../favorites/errors/not-in-favorites.error';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly dbService: DbService,
    private readonly favoritesService: FavoritesService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntityInterface> {
    const album = {
      id: generateUuid(),
      ...createAlbumDto,
    };

    await this.dbService.db.albums.add(album);

    return album;
  }

  async findAll(): Promise<AlbumEntityInterface[]> {
    const albums = await this.dbService.db.albums.findAll();

    return albums;
  }

  async findOne(id: string): Promise<AlbumEntityInterface | undefined> {
    const album = await this.dbService.db.albums.findById(id);

    return album;
  }

  async update(
    album: AlbumEntityInterface,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntityInterface> {
    const updatedAlbum = await this.dbService.db.albums.update(album.id, {
      ...album,
      ...updateAlbumDto,
    });

    return updatedAlbum;
  }

  async remove(album: AlbumEntityInterface): Promise<void> {
    await this.dbService.db.albums.remove(album.id);

    try {
      await this.favoritesService.removeAlbum(album.id);
    } catch (error) {
      const isNotInFavoritesError = error instanceof NotInFavoritesError;

      if (!isNotInFavoritesError) {
        throw error;
      }
    }

    const tracks = await this.dbService.db.tracks.findByField(
      'albumId',
      album.id,
    );

    tracks.forEach(async (track) => {
      await this.dbService.db.tracks.update(track.id, {
        ...track,
        albumId: null,
      });
    });
  }
}
