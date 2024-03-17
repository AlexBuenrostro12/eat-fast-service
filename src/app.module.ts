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
import { ProductService } from './product/product.service';
import { IngredientService } from './ingredient/ingredient.service';
import { ProductController } from './product/product.controller';
import { IngredientController } from './ingredient/ingredient.controller';
import { OrderDetailController } from './order-detail/order-detail.controller';
import { OrderDetailService } from './order-detail/order-detail.service';
import { OrderDetail } from './order-detail/entity/oder-detail.entity';
import { Order } from './order/entity/oder.entity';
import { OrderService } from './order/order.service';
import { OrderedProduct } from './ordered-product/entity/ordered-product.entity';
import { OrderedProductModule } from './ordered-product/ordered-product.module';
import { OrderedProductController } from './ordered-product/ordered-product.controller';
import { OrderedProductService } from './ordered-product/ordered-product.service';
import { OrderedIngredient } from './ordered-ingredient/entity/odered-ingredient.entity';
import { OrderedIngredientModule } from './ordered-ingredient/ordered-ingredient.module';
import { OrderedIngredientController } from './ordered-ingredient/odered-ingredient.controller';
import { OrderedIngredientService } from './ordered-ingredient/odered-ingredient.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: process.env.DB_HOST, // database host
      port: +process.env.DB_PORT || 5432, // database host
      username: process.env.DB_USERNAME, // username
      password: process.env.DB_PASSWORD, // user password
      database: process.env.DB_DATA_BASE, // name of our database,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
    TypeOrmModule.forFeature([
      User,
      Address,
      Business,
      Product,
      Ingredient,
      OrderDetail,
      Order,
      OrderedProduct,
      OrderedIngredient,
    ]),
    UserModule,
    AddressModule,
    OrderModule,
    OrderDetailModule,
    ProductModule,
    IngredientModule,
    BusinessModule,
    OrderedProductModule,
    OrderedIngredientModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    UserController,
    AddressController,
    BusinessController,
    OrderController,
    ProductController,
    IngredientController,
    OrderDetailController,
    OrderedProductController,
    OrderedIngredientController,
    AuthController,
  ],
  providers: [
    AppService,
    UserService,
    AddressService,
    BusinessService,
    ProductService,
    IngredientService,
    OrderDetailService,
    OrderService,
    OrderedProductService,
    OrderedIngredientService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
