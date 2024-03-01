import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessDto } from './create-business.dto';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Product } from 'src/product/entity/product.entity';

export class UpdateBusinessDto extends PartialType(CreateBusinessDto) {
  @IsOptional()
  @Type(() => Array<Product>)
  product?: Product[];
}
