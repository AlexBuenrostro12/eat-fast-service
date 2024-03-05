import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { OrderedIngredient } from 'src/ordered-ingredient/entity/odered-ingredient.entity';
import { OrderedProduct } from 'src/ordered-product/entity/ordered-product.entity';

export class CreateOrderDetailDto {
  @Type(() => OrderedProduct)
  readonly product: OrderedProduct;

  @Type(() => Array<OrderedIngredient>)
  readonly ingredients: Array<OrderedIngredient>;

  @IsNumber()
  readonly quantity: number;
}
