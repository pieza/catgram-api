import { Body, Controller, Post, Get, UseGuards, Request, HttpCode, ConflictException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from './local.auth.guard';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedGuard } from './authenticated.guard';

const SALT_OR_ROUDS = 10;

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/signup')
  async create(@Body() user: CreateUserDto) {
    const existingUser = await this.usersService.findByUsername(user.username);
    if (existingUser) throw new ConflictException("Username already taken");
    user.password = await bcrypt.hash(user.password, SALT_OR_ROUDS);
    return await this.usersService.create(user)
  }

  @Post('/login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  login(@Request() req): any {
    return req.user;
  }

  @Post('/current')
  @HttpCode(200)
  @UseGuards(AuthenticatedGuard)
  current(@Request() req): any {
    return req.user;
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return true;
  }
}
