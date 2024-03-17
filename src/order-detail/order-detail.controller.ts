import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Get()
  findAll() {
    return this.orderDetailService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.orderDetailService.findOneById(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDetailDto) {
    return this.orderDetailService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateOrderDetailDto) {
    return this.orderDetailService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderDetailService.delete(id);
  }
}
