import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { ProductModule } from './product/product.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { ComplementModule } from './complement/complement.module';
import { BusinessModule } from './business/business.module';
import { AddressService } from './address/address.service';
import { AddressController } from './address/address.controller';
import { BusinessController } from './business/business.controller';
import { BusinessService } from './business/business.service';
import { User } from './user/entity/user.entity';
import { Address } from './address/entity/address.entity';
import { Business } from './business/entity/business.entity';
import { Product } from './product/entity/product.entity';
import { Ingredient } from './ingredient/entity/ingredient.entity';
import { Complement } from './complement/entity/complement.entity';
import { ProductService } from './product/product.service';
import { IngredientService } from './ingredient/ingredient.service';
import { ComplementService } from './complement/complement.service';
import { ProductController } from './product/product.controller';
import { IngredientController } from './ingredient/ingredient.controller';
import { ComplementController } from './complement/complement.controller';
import { OrderDetailController } from './order-detail/order-detail.controller';
import { OrderDetailService } from './order-detail/order-detail.service';
import { OrderDetail } from './order-detail/entity/oder-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5432, // database host
      username: 'postgres', // username
      password: 'Password1!', // user password
      database: 'eat-fast-dev', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
    TypeOrmModule.forFeature([
      User,
      Address,
      Business,
      Product,
      Ingredient,
      Complement,
      OrderDetail,
    ]),
    UserModule,
    AddressModule,
    OrderModule,
    OrderDetailModule,
    ProductModule,
    IngredientModule,
    ComplementModule,
    BusinessModule,
  ],
  controllers: [
    AppController,
    UserController,
    AddressController,
    BusinessController,
    OrderController,
    ProductController,
    IngredientController,
    ComplementController,
    OrderDetailController,
  ],
  providers: [
    AppService,
    UserService,
    AddressService,
    BusinessService,
    ProductService,
    IngredientService,
    ComplementService,
    OrderDetailService,
  ],
})
export class AppModule {}
