import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../common/uuid/config';
import { constants as httpStatus } from 'http2';
import { errorMessages } from '../../common/messages/error.messages';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiOperation({ summary: 'Create an artist' })
  async create(@Body() createArtistDto: CreateArtistDto) {
    const artist = await this.artistsService.create(createArtistDto);

    return artist;
  }

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  async findAll() {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an artist by id' })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException(errorMessages.ARTIST_NOT_FOUND);
    }

    return artist;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an artist by id' })
  async update(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException(errorMessages.ARTIST_NOT_FOUND);
    }

    const updatedArtist = await this.artistsService.update(
      artist,
      updateArtistDto,
    );

    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(httpStatus.HTTP_STATUS_NO_CONTENT)
  @ApiOperation({ summary: 'Delete an artist by id' })
  async remove(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException(errorMessages.ARTIST_NOT_FOUND);
    }

    return await this.artistsService.remove(artist);
  }
}
