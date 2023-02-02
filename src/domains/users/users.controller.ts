import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDtoInterface } from './interfaces/update-password.dto.interface';
import { UsersFormatter } from './users.formatter';
import { DEFAULT_UUID_VERSION_NUMBER } from '../../common/uuid/config';

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
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDtoInterface,
  ) {
    await this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
