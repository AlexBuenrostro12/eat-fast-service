import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreateBusinessDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly phone: number;

  @IsOptional()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;

  @IsString()
  readonly start: string;

  @IsString()
  readonly end: string;

  @IsBoolean()
  readonly open: boolean;
}
