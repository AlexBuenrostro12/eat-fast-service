import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Ingredient } from 'src/ingredient/entity/ingredient.entity';
import { Complement } from 'src/complement/entity/complement.entity';
import { ComplementService } from 'src/complement/complement.service';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { Business } from 'src/business/entity/business.entity';
import { BusinessService } from 'src/business/business.service';
import { Address } from 'src/address/entity/address.entity';
import { AddressService } from 'src/address/address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Ingredient,
      Complement,
      Business,
      Address,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    IngredientService,
    ComplementService,
    BusinessService,
    AddressService,
  ],
})
export class ProductModule {}
