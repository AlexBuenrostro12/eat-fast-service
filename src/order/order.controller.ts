import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('all')
  findAll(@Request() req: AuthUserDto) {
    return this.orderService.findAll(req.user.id, req.user.role);
  }

  @Get(':id')
  findOneById(@Param('id') id: number, @Request() req: AuthUserDto) {
    return this.orderService.findOneById(id, req.user.id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto, @Request() req: AuthUserDto) {
    return this.orderService.create(req.user.id, payload);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Request() req: AuthUserDto,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(id, req.user.id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Request() req: AuthUserDto) {
    return this.orderService.delete(id, req.user.id);
  }
}
