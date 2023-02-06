import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../common/uuid/config';
import { TracksService } from '../tracks/tracks.service';
import { errorMessages } from '../../common/messages/error.messages';
import { FavoriteEntity } from './entities/favorite.entity';
import { constants as httpStatus } from 'http2';
import { NotInFavoritesError } from './errors/not-in-favorites.error';
import { UnprocessableEntityException } from '@nestjs/common/exceptions/unprocessable-entity.exception';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { OutputAddedDto } from './dto/output-added.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TracksService,
    private readonly artistService: ArtistsService,
    private readonly albumService: AlbumsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  async findAll() {
    const favorites = await this.favoritesService.findAll();

    return favorites;
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add a track to favorites by id' })
  async addTrack(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ): Promise<OutputAddedDto> {
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException(errorMessages.TRACK_NOT_FOUND);
    }

    await this.favoritesService.addTrack(track.id);

    return { added: true, message: `Track ${track.id} added to favorites` };
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add an artist to favorites by id' })
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ): Promise<OutputAddedDto> {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException(errorMessages.ARTIST_NOT_FOUND);
    }

    await this.favoritesService.addArtist(artist.id);

    return { added: true, message: `Artist ${artist.id} added to favorites` };
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add an album to favorites by id' })
  async addAlbum(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ): Promise<OutputAddedDto> {
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException(errorMessages.ALBUM_NOT_FOUND);
    }

    await this.favoritesService.addAlbum(album.id);

    return { added: true, message: `Album ${album.id} added to favorites` };
  }

  @Delete('track/:id')
  @HttpCode(httpStatus.HTTP_STATUS_NO_CONTENT)
  @ApiOperation({ summary: 'Remove a track from favorites by id' })
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ) {
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new NotFoundException(errorMessages.TRACK_NOT_FOUND);
    }

    try {
      await this.favoritesService.removeTrack(track.id);
    } catch (e) {
      if (e instanceof NotInFavoritesError) {
        throw new UnprocessableEntityException(e.message);
      }

      throw e;
    }
  }

  @Delete('artist/:id')
  @HttpCode(httpStatus.HTTP_STATUS_NO_CONTENT)
  @ApiOperation({ summary: 'Remove an artist from favorites by id' })
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ) {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException(errorMessages.ARTIST_NOT_FOUND);
    }

    try {
      await this.favoritesService.removeArtist(artist.id);
    } catch (e) {
      if (e instanceof NotInFavoritesError) {
        throw new UnprocessableEntityException(e.message);
      }

      throw e;
    }
  }

  @Delete('album/:id')
  @HttpCode(httpStatus.HTTP_STATUS_NO_CONTENT)
  @ApiOperation({ summary: 'Remove an album from favorites by id' })
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ) {
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException(errorMessages.ALBUM_NOT_FOUND);
    }

    try {
      await this.favoritesService.removeAlbum(album.id);
    } catch (e) {
      if (e instanceof NotInFavoritesError) {
        throw new UnprocessableEntityException(e.message);
      }

      throw e;
    }
  }
}
