import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

export class OrderDto {
  @IsNumber()
  readonly productId: number;

  @Type(() => Array<number>)
  readonly ingredientIds: Array<number>;

  @IsNumber()
  readonly quantity: number;
}

export class CreateOrderDto {
  @IsNumber()
  readonly businessId: number;

  @IsNumber()
  readonly total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  readonly orders: Array<OrderDto>;
}
