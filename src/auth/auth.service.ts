import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoggedInUser } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  private readonly jwtRefreshExpiresIn: string;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService<
      { JWT_REFRESH_EXPIRES_IN: string },
      true
    >,
  ) {
    this.jwtRefreshExpiresIn = this.configService.get('JWT_REFRESH_EXPIRES_IN');
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return null;
    }

    delete user.password;

    return user;
  }

  async login(
    user: LoggedInUser,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { email: user.email, sub: user.id };
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.jwtRefreshExpiresIn,
    });

    await this.userService.update(user.id, { refreshToken });

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
    };
  }

  async refreshToken(user: LoggedInUser): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
