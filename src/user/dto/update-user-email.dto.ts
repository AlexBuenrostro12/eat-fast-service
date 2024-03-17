import { IsEmail, IsString } from 'class-validator';

export class UpdateUserEmailDto {
  @IsString()
  @IsEmail()
  readonly oldEmail: string;

  @IsString()
  @IsEmail()
  readonly newEmail: string;
}
