import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { STATUS } from '../enum/order.enum';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(STATUS)
  readonly status?: STATUS;

  @IsOptional()
  @IsNumber()
  readonly total?: number;
}
