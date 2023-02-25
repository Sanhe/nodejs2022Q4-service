import { Injectable } from '@nestjs/common';
import { OutputFavoritesDto } from './dto/output-favorites.dto';
import { generateUuid } from '../../common/uuid';
import { NotInFavoritesError } from './errors/not-in-favorites.error';
import { PrismaService } from '../../common/prisma.service';
import { Favorite } from '@prisma/client';
import { AlreadyInFavoritesError } from './errors/already-in-favorites.error';
import { CustomLoggerService } from '../../common/logger/logger.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: CustomLoggerService,
  ) {
    this.logger.setContext(FavoritesService.name);
  }

  async findAll(): Promise<any> {
    const favorites = await this.prismaService.favorite.findMany({
      select: {
        id: false,
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    if (favorites.length === 0) {
      return new OutputFavoritesDto();
    }

    const artists = favorites[0].artists;
    const albums = favorites[0].albums;
    const tracks = favorites[0].tracks;
    const outputFavorites = new OutputFavoritesDto(artists, albums, tracks);

    return outputFavorites;
  }

  async createEmptyFavorite(): Promise<Favorite> {
    const newFavorite = await this.prismaService.favorite.create({
      data: {
        id: generateUuid(),
      },
    });

    return newFavorite;
  }

  async getFavorite(): Promise<Favorite> {
    const favorite = await this.prismaService.favorite.findFirst();

    if (!favorite) {
      const newFavorite = await this.createEmptyFavorite();

      return newFavorite;
    }

    return favorite;
  }

  async findTrackId(trackId: string): Promise<string | boolean> {
    const favorite = await this.getFavorite();

    const favoriteWithTrack = await this.prismaService.favorite.findMany({
      where: {
        id: favorite.id,
      },
      select: {
        tracks: {
          where: {
            id: trackId,
          },
        },
      },
    });

    if (!favoriteWithTrack[0].tracks[0]) {
      return false;
    }

    return favoriteWithTrack[0].tracks[0].id;
  }

  async addTrack(trackId: string) {
    const favorite = await this.getFavorite();
    const trackIdInFavorite = await this.findTrackId(trackId);

    if (trackIdInFavorite) {
      throw new AlreadyInFavoritesError();
    }

    await this.prismaService.favorite.update({
      data: {
        tracks: {
          connect: {
            id: trackId,
          },
        },
      },
      where: {
        id: favorite.id,
      },
    });
  }

  async removeTrack(trackId: string) {
    const favorite = await this.getFavorite();
    const trackIdInFavorite = await this.findTrackId(trackId);

    if (!trackIdInFavorite) {
      throw new NotInFavoritesError();
    }

    await this.prismaService.favorite.update({
      data: {
        tracks: {
          disconnect: {
            id: trackId,
          },
        },
      },
      where: {
        id: favorite.id,
      },
    });
  }

  async findAlbumId(albumId: string): Promise<string | boolean> {
    const favorite = await this.getFavorite();

    const favoriteWithTrack = await this.prismaService.favorite.findMany({
      where: {
        id: favorite.id,
      },
      select: {
        albums: {
          where: {
            id: albumId,
          },
        },
      },
    });

    if (!favoriteWithTrack[0].albums[0]) {
      return false;
    }

    return favoriteWithTrack[0].albums[0].id;
  }

  async addAlbum(albumId: string) {
    const favorite = await this.getFavorite();
    const albumIdInFavorite = await this.findAlbumId(albumId);

    if (albumIdInFavorite) {
      throw new AlreadyInFavoritesError();
    }

    await this.prismaService.favorite.update({
      data: {
        albums: {
          connect: {
            id: albumId,
          },
        },
      },
      where: {
        id: favorite.id,
      },
    });
  }

  async removeAlbum(albumId: string) {
    const favorite = await this.getFavorite();
    const albumIdInFavorite = await this.findAlbumId(albumId);

    if (!albumIdInFavorite) {
      throw new NotInFavoritesError();
    }

    await this.prismaService.favorite.update({
      data: {
        albums: {
          disconnect: {
            id: albumId,
          },
        },
      },
      where: {
        id: favorite.id,
      },
    });
  }

  async findArtistId(artistId: string): Promise<string | boolean> {
    const favorite = await this.getFavorite();

    const favoriteWithTrack = await this.prismaService.favorite.findMany({
      where: {
        id: favorite.id,
      },
      select: {
        artists: {
          where: {
            id: artistId,
          },
        },
      },
    });

    if (!favoriteWithTrack[0].artists[0]) {
      return false;
    }

    return favoriteWithTrack[0].artists[0].id;
  }

  async addArtist(artistId: string) {
    const favorite = await this.getFavorite();
    const artistIdInFavorite = await this.findArtistId(artistId);

    if (artistIdInFavorite) {
      throw new AlreadyInFavoritesError();
    }

    await this.prismaService.favorite.update({
      data: {
        artists: {
          connect: {
            id: artistId,
          },
        },
      },
      where: {
        id: favorite.id,
      },
    });
  }

  async removeArtist(artistId: string) {
    const favorite = await this.getFavorite();
    const artistIdInFavorite = await this.findArtistId(artistId);

    if (!artistIdInFavorite) {
      throw new NotInFavoritesError();
    }

    await this.prismaService.favorite.update({
      data: {
        artists: {
          disconnect: {
            id: artistId,
          },
        },
      },
      where: {
        id: favorite.id,
      },
    });
  }
}
