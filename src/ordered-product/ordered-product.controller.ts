import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderedProductService } from './ordered-product.service';
import { CreateOrderedProductDto } from './dto/create-ordered-product.dto';
import { UpdateOrderedProductDto } from './dto/update-ordered-product.dto';

@Controller('ordered-product')
export class OrderedProductController {
  constructor(private readonly orderedProductService: OrderedProductService) {}

  @Get()
  findAll() {
    return this.orderedProductService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.orderedProductService.findOneById(id);
  }

  @Post()
  create(@Body() payload: CreateOrderedProductDto) {
    return this.orderedProductService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateOrderedProductDto) {
    return this.orderedProductService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderedProductService.delete(id);
  }
}
