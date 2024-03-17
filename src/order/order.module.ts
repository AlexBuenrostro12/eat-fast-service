import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/oder.entity';
import { OrderDetail } from 'src/order-detail/entity/oder-detail.entity';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { Business } from 'src/business/entity/business.entity';
import { Address } from 'src/address/entity/address.entity';
import { BusinessService } from 'src/business/business.service';
import { AddressService } from 'src/address/address.service';
import { OrderedProduct } from 'src/ordered-product/entity/ordered-product.entity';
import { OrderedIngredient } from 'src/ordered-ingredient/entity/odered-ingredient.entity';
import { OrderedIngredientService } from 'src/ordered-ingredient/odered-ingredient.service';
import { OrderedProductService } from 'src/ordered-product/ordered-product.service';
import { Product } from 'src/product/entity/product.entity';
import { Ingredient } from 'src/ingredient/entity/ingredient.entity';
import { ProductService } from 'src/product/product.service';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderDetail,
      Product,
      Ingredient,
      OrderedProduct,
      OrderedIngredient,
      Business,
      Address,
      User,
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderDetailService,
    ProductService,
    IngredientService,
    OrderedIngredientService,
    OrderedProductService,
    BusinessService,
    AddressService,
    UserService,
  ],
})
export class OrderModule {}
