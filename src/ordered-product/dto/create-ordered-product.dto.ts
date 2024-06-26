import { IsNumber, IsString } from 'class-validator';

export class CreateOrderedProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;
}
