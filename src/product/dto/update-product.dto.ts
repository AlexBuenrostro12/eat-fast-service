import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Ingredient } from 'src/ingredient/entity/ingredient.entity';
import { PRODUCT_TYPE } from 'src/user/enum/product.enum';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @Type(() => Array<Ingredient>)
  @IsOptional()
  readonly ingredient?: Ingredient[];

  @IsOptional()
  @IsBoolean()
  readonly inStock?: boolean;

  @IsEnum(PRODUCT_TYPE)
  @IsOptional()
  readonly type?: PRODUCT_TYPE;

  @IsNumber()
  @IsOptional()
  readonly minPrice?: number;

  @IsNumber()
  @IsOptional()
  readonly maxPrice?: number;
}
