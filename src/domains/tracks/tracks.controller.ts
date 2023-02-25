import { constants as httpStatus } from 'http2';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { errorMessages } from '../../common/messages/error.messages';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { parseUUIDPipe } from '../../common/pipes/parse-uuid.pipe';

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
    @Param('id', parseUUIDPipe)
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
    @Param('id', parseUUIDPipe)
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
    @Param('id', parseUUIDPipe)
    id: string,
  ) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException(errorMessages.TRACK_NOT_FOUND);
    }

    return await this.tracksService.remove(track);
  }
}
