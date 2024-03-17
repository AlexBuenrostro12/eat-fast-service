import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderedIngredientDto } from './create-ordered-ingredient.dto';

export class UpdateOrderedIngredientDto extends PartialType(
  CreateOrderedIngredientDto,
) {}
