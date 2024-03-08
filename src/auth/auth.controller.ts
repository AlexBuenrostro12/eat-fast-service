import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/shared/decorator/public.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    console.log('req: ', req);
    return this.authService.login(req.user);
  }
}
