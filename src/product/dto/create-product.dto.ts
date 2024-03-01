import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { CreateComplementDto } from 'src/complement/dto/create-complement.dto';
import { CreateIngredientDto } from 'src/ingredient/dto/create-ingredient.dto';

export class CreateProductDto {
  @IsNumber()
  readonly businessId: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;

  @Type(() => Array<CreateIngredientDto>)
  readonly ingredients: CreateIngredientDto[];

  @Type(() => Array<CreateComplementDto>)
  readonly complements: CreateComplementDto[];
}
