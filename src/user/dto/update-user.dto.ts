import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';

class OmitedUserDto extends OmitType(CreateUserDto, [
  'password',
  'address',
] as const) {}

export class UpdateUserDto extends PartialType(OmitedUserDto) {
  @IsOptional()
  @Type(() => UpdateAddressDto)
  address?: UpdateAddressDto;

  @IsString()
  @IsOptional()
  readonly refreshToken?: string;

  @IsString()
  @IsOptional()
  readonly forgotPasswordToken?: string;
}
