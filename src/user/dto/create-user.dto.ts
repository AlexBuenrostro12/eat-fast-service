import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

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

  @IsString()
  readonly password: string;

  @IsOptional()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;
}
