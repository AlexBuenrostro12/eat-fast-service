import { Type } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';
import { Product } from 'src/product/entity/product.entity';

export class CreateOrderDetailDto {
  @Type(() => Product)
  readonly product: Product;

  @IsArray()
  readonly ingredientIds: Array<number>;

  @IsNumber()
  readonly quantity: number;
}
