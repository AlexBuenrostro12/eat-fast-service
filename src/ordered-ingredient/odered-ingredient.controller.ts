import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderedIngredientService } from './odered-ingredient.service';
import { CreateOrderedIngredientDto } from './dto/create-ordered-ingredient.dto';
import { UpdateOrderedIngredientDto } from './dto/update-ordered-ingredient.dto';

@Controller('odered-ingredient')
export class OrderedIngredientController {
  constructor(
    private readonly oderedIngredientService: OrderedIngredientService,
  ) {}

  @Get()
  findAll() {
    return this.oderedIngredientService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.oderedIngredientService.findOneById(id);
  }

  @Post()
  create(@Body() payload: CreateOrderedIngredientDto) {
    return this.oderedIngredientService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateOrderedIngredientDto) {
    return this.oderedIngredientService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.oderedIngredientService.delete(id);
  }
}
