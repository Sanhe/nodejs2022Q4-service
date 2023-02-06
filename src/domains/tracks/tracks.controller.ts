import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  ParseUUIDPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../common/uuid/config';
import { constants as httpStatus } from 'http2';
import { errorMessages } from '../../common/messages/error.messages';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a track' })
  async create(@Body() createTrackDto: CreateTrackDto) {
    const track = await this.tracksService.create(createTrackDto);

    return track;
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  async findAll() {
    const tracks = await this.tracksService.findAll();

    return tracks;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a track by id' })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException(errorMessages.TRACK_NOT_FOUND);
    }

    return track;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a track by id' })
  async update(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException(errorMessages.TRACK_NOT_FOUND);
    }

    return this.tracksService.update(track, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(httpStatus.HTTP_STATUS_NO_CONTENT)
  @ApiOperation({ summary: 'Delete a track by id' })
  async remove(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException(errorMessages.TRACK_NOT_FOUND);
    }

    return await this.tracksService.remove(track);
  }
}
