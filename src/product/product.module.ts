import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Ingredient } from 'src/ingredient/entity/ingredient.entity';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { Business } from 'src/business/entity/business.entity';
import { BusinessService } from 'src/business/business.service';
import { Address } from 'src/address/entity/address.entity';
import { AddressService } from 'src/address/address.service';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Ingredient, Business, Address, User]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    IngredientService,
    BusinessService,
    AddressService,
    UserService,
  ],
})
export class ProductModule {}
