import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(AuthenticatedGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch()
  @UseGuards(AuthenticatedGuard)
  update(@Body() user: UpdateUserDto, @Request() req) {
    return this.usersService.update(req.user.id, user);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  remove(@Request() req, @Param('id') id: string) {
    if (req.user.id === id)
      return this.usersService.remove(id);
    return false;
  }
}
