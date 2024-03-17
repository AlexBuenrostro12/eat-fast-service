import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderedProduct } from './entity/ordered-product.entity';
import { OrderedProductController } from './ordered-product.controller';
import { OrderedProductService } from './ordered-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderedProduct])],
  controllers: [OrderedProductController],
  providers: [OrderedProductService],
})
export class OrderedProductModule {}
