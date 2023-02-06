import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../common/uuid/config';
import { constants as httpStatus } from 'http2';
import { errorMessages } from '../../common/messages/error.messages';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @ApiOperation({ summary: 'Create an album' })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const album = await this.albumsService.create(createAlbumDto);

    return album;
  }

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  async findAll() {
    const albums = await this.albumsService.findAll();

    return albums;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an album by id' })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ) {
    const album = await this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException(errorMessages.ALBUM_NOT_FOUND);
    }

    return album;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an album by id' })
  async update(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException(errorMessages.ALBUM_NOT_FOUND);
    }

    const updatedAlbum = await this.albumsService.update(album, updateAlbumDto);

    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(httpStatus.HTTP_STATUS_NO_CONTENT)
  @ApiOperation({ summary: 'Delete an album by id' })
  async remove(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ) {
    const album = await this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException(errorMessages.ALBUM_NOT_FOUND);
    }

    return await this.albumsService.remove(album);
  }
}
