import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateIngredientDto } from 'src/ingredient/dto/create-ingredient.dto';
import { PRODUCT_TYPE } from 'src/user/enum/product.enum';

export class CreateProductDto {
  @IsNumber()
  readonly businessId: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  @IsOptional()
  readonly price?: number;

  @IsEnum(PRODUCT_TYPE)
  @IsOptional()
  readonly type?: PRODUCT_TYPE;

  @IsNumber()
  @IsOptional()
  readonly minPrice?: number;

  @IsNumber()
  @IsOptional()
  readonly maxPrice?: number;

  @Type(() => Array<CreateIngredientDto>)
  readonly ingredients: CreateIngredientDto[];
}
