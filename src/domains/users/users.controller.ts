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
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersFormatter } from './users.formatter';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../common/uuid/config';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserNotFoundException } from './errors/user-not-found.error';
import { InvalidPasswordError } from './errors/invalid-password.error';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersFormatter: UsersFormatter,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const formattedUser = this.usersFormatter.formatUserToOutput(user);

    return formattedUser;
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    const users = await this.usersService.findAll();
    const formattedUsers = this.usersFormatter.formatUsersToOutput(users);

    return formattedUsers;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    const formattedUser = this.usersFormatter.formatUserToOutput(user);

    return formattedUser;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user password' })
  async updatePassword(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    try {
      const updatedUser = await this.usersService.updatePassword(
        user,
        updatePasswordDto,
      );

      const formattedUser = this.usersFormatter.formatUserToOutput(updatedUser);

      return formattedUser;
    } catch (error) {
      if (error instanceof InvalidPasswordError) {
        throw new HttpException(
          error.message,
          httpStatus.HTTP_STATUS_FORBIDDEN,
        );
      }

      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(httpStatus.HTTP_STATUS_NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  async remove(
    @Param('id', new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION_NUMBER }))
    id: string,
  ) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    await this.usersService.remove(user);
  }
}
