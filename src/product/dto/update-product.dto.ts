import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Ingredient } from 'src/ingredient/entity/ingredient.entity';

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
}
