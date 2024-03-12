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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Request() req: AuthUserDto) {
    return this.productService.findAll(req.user.id);
  }

  @Get(':id')
  findOneById(@Param('id') id: number, @Request() req: AuthUserDto) {
    return this.productService.findOneById(id, req.user.id);
  }

  @Post()
  createByBusinessId(
    @Body() payload: CreateProductDto,
    @Request() req: AuthUserDto,
  ) {
    return this.productService.createByBusinessId(payload, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() payload: UpdateProductDto,
    @Request() req: AuthUserDto,
  ) {
    return this.productService.update(id, req.user.id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
