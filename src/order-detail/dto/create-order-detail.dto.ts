import { Type } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';
import { Product } from 'src/product/entity/product.entity';

export class CreateOrderDetailDto {
  @Type(() => Product)
  readonly product: Product;

  @IsArray({ each: true })
  readonly ingredientIds: Array<number>;

  @IsArray({ each: true })
  readonly complementIds: Array<number>;

  @IsNumber()
  readonly quantity: number;
}
