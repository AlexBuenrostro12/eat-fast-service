import { IsEmail, IsNumber, IsString } from 'class-validator';

export class LoggedInUser {
  @IsNumber()
  readonly id: number;

  @IsEmail()
  @IsString()
  readonly email: string;

  @IsString()
  readonly role: string;
}

export class AuthUserDto {
  user: LoggedInUser;
}
