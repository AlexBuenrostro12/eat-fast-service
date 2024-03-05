import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/oder.entity';
import { OrderDetail } from 'src/order-detail/entity/oder-detail.entity';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { Product } from 'src/product/entity/product.entity';
import { ProductService } from 'src/product/product.service';
import { Ingredient } from 'src/ingredient/entity/ingredient.entity';
import { Business } from 'src/business/entity/business.entity';
import { Address } from 'src/address/entity/address.entity';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { BusinessService } from 'src/business/business.service';
import { AddressService } from 'src/address/address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderDetail,
      Product,
      Ingredient,
      Business,
      Address,
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderDetailService,
    ProductService,
    IngredientService,
    BusinessService,
    AddressService,
  ],
})
export class OrderModule {}
