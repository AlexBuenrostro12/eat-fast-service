import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.ingredientService.findOneById(id);
  }

  @Post()
  create(@Body() payload: CreateIngredientDto) {
    return this.ingredientService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateIngredientDto) {
    return this.ingredientService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ingredientService.delete(id);
  }
}
