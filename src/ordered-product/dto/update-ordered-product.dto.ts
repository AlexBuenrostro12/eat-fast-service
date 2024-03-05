import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderedProductDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  readonly price?: number;
}
