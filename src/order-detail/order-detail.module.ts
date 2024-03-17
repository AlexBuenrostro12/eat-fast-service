import { Module } from '@nestjs/common';
import { OrderDetailController } from './order-detail.controller';
import { OrderDetailService } from './order-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entity/oder-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
