import { IsNumber } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNumber()
  readonly quantity: number;
}
