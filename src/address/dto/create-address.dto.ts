import { IsEnum, IsNumber, IsString } from 'class-validator';
import { COLOGNE } from 'src/shared/enum/cologne.enum';

export class CreateAddressDto {
  @IsString()
  readonly street: string;

  @IsNumber()
  readonly number: number;

  @IsEnum(COLOGNE)
  readonly cologne: COLOGNE;
}
