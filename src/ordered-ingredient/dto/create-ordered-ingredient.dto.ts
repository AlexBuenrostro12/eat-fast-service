import { IsEnum, IsString } from 'class-validator';
import { INGREDIENT_TYPE } from 'src/shared/enum/ingredient-type.enum';

export class CreateOrderedIngredientDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsEnum(INGREDIENT_TYPE)
  readonly type: INGREDIENT_TYPE;
}
