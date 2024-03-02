import { IsEnum, IsNumber } from 'class-validator';
import { STATUS } from '../enum/order.enum';

export class UpdateOrderDto {
  @IsEnum(STATUS)
  readonly status: STATUS;

  @IsNumber()
  readonly total: number;
}
