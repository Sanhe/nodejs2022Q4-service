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
import { errorMessages } from './messages/error.messages';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../common/uuid/config';
import { constants as httpStatus } from 'http2';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    const track = await this.tracksService.create(createTrackDto);

    return track;
  }

  @Get()
  async findAll() {
    const tracks = await this.tracksService.findAll();

    return tracks;
  }

  @Get(':id')
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
