import { IsArray, IsNumber } from 'class-validator';

export class OrderDto {
  @IsNumber()
  readonly productId: number;

  @IsArray({ each: true })
  readonly ingredientIds: Array<number>;

  @IsArray({ each: true })
  readonly complementIds: Array<number>;

  @IsNumber()
  readonly quantity: number;
}

export class CreateOrderDto {
  @IsArray({ each: true })
  readonly orders: Array<OrderDto>;
}
