import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { USER_ROLE } from '../enum/user-role.enum';

export class CreateUserDto {
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNumber()
  readonly phone: number;

  @IsEnum(USER_ROLE)
  readonly role: USER_ROLE;

  @IsString()
  readonly password: string;

  @IsOptional()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;
}
