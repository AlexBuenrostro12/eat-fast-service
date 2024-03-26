import { IsEmail, IsNumber, IsString } from 'class-validator';
import { USER_ROLE } from 'src/user/enum/user-role.enum';

export class LoggedInUser {
  @IsNumber()
  readonly id: number;

  @IsEmail()
  @IsString()
  readonly email: string;

  @IsString()
  readonly role: USER_ROLE;
}

export class AuthUserDto {
  user: LoggedInUser;
}
