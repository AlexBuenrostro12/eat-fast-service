import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('profile-by-id/:id')
  findOneById(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @Get('profile')
  findProfile(@Request() req: AuthUserDto) {
    return this.userService.findOneById(req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
