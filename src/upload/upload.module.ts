import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Address } from 'src/address/entity/address.entity';
import { AddressService } from 'src/address/address.service';
import { Business } from 'src/business/entity/business.entity';
import { BusinessService } from 'src/business/business.service';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entity/product.entity';
import { Ingredient } from 'src/ingredient/entity/ingredient.entity';
import { IngredientService } from 'src/ingredient/ingredient.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address, Business, Product, Ingredient]),
  ],
  controllers: [UploadController],
  providers: [
    UploadService,
    UserService,
    AddressService,
    BusinessService,
    ProductService,
    IngredientService,
  ],
})
export class UploadModule {}
