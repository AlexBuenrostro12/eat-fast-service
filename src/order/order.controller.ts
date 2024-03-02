import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.orderService.findOneById(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateOrderDto) {
    return this.orderService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
