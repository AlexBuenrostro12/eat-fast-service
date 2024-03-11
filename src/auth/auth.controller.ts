import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/shared/decorator/public.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { RefreshJwtAuthGuard } from './guard/resfresh-jwt-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { UpdateUserEmailDto } from 'src/user/dto/update-user-email.dto';
import { UpdateUserPasswordDto } from 'src/user/dto/update-user-password.dto';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: AuthUserDto) {
    return this.authService.login(req.user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req: AuthUserDto) {
    return this.authService.refreshToken(req.user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('change-email')
  updateEmail(
    @Request() req: AuthUserDto,
    @Body() payload: UpdateUserEmailDto,
  ) {
    return this.userService.updateEmail(req.user.id, payload);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('change-password')
  updatePassword(
    @Request() req: AuthUserDto,
    @Body() payload: UpdateUserPasswordDto,
  ) {
    return this.userService.updatePassword(req.user.id, payload);
  }
}
