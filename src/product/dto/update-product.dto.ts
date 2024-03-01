import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Complement } from 'src/complement/entity/complement.entity';
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
  @Type(() => Array<Complement>)
  readonly complement?: Complement[];
}
