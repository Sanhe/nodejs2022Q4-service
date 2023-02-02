import { constants as httpStatus } from 'node:http2';
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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersFormatter } from './users.formatter';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../common/uuid/config';
import { UpdatePasswordDto } from './dtos/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersFormatter: UsersFormatter,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const formattedUser = this.usersFormatter.formatUserToOutput(user);

    return formattedUser;
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    const formattedUsers = this.usersFormatter.formatUsersToOutput(users);

    return formattedUsers;
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ) {
    const user = await this.usersService.findOne(id);
    const formattedUser = this.usersFormatter.formatUserToOutput(user);

    return formattedUser;
  }

  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = await this.usersService.updatePassword(id, updatePasswordDto);
    const formattedUser = this.usersFormatter.formatUserToOutput(user);

    return formattedUser;
  }

  @Delete(':id')
  @HttpCode(httpStatus.HTTP_STATUS_NO_CONTENT)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ) {
    await this.usersService.remove(id);
  }
}
