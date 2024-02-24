import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreateUserDto {
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly phone: number;

  @IsString()
  readonly passsword: string;

  @IsOptional()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;
}
