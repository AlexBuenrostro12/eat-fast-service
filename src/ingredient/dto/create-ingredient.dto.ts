import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { INGREDIENT_TYPE } from '../../shared/enum/ingredient-type.enum';

export class CreateIngredientDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly required: boolean;

  @IsEnum(INGREDIENT_TYPE)
  readonly type: INGREDIENT_TYPE;
}
