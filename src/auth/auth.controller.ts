import { constants as httpStatus } from 'http2';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from '../domains/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { Public } from './decorators/public.decorator';
import { RefreshAuthGuard } from './guards/refresh.auth.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signup(createUserDto);

    return {
      id: user.id,
      message: 'User created successfully',
    };
  }

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(httpStatus.HTTP_STATUS_OK)
  async login(@Request() request: any) {
    const jwtTokens = await this.authService.login(request.user);

    return jwtTokens;
  }

  @Public()
  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  @HttpCode(httpStatus.HTTP_STATUS_OK)
  async refresh(@Request() request: any) {
    const jwtTokens = await this.authService.refresh(request.user);

    return jwtTokens;
  }
}
