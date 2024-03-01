import { IsBoolean, IsString } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly required: boolean;
}
