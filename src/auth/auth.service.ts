import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly jwtRefreshExpiresIn;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService<{ EXPIRES_IN: string }, true>,
  ) {
    this.jwtRefreshExpiresIn = this.configService.get('EXPIRES_IN', {
      infer: true,
    });
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
    user: User,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: this.jwtRefreshExpiresIn,
      }),
    };
  }

  async refreshToken(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
