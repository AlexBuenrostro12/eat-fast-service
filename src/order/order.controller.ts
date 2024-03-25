import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';
import { Response } from 'express';

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
  async create(
    @Body() payload: CreateOrderDto,
    @Request() req: AuthUserDto,
    @Res() res: Response,
  ) {
    const order = await this.orderService.create(req.user.id, payload);
    if (!order.created) {
      throw new BadRequestException(
        'Error at create a new order',
        order?.error,
      );
    }

    res.send(order).status(HttpStatus.CREATED);
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
