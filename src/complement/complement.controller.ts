import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ComplementService } from './complement.service';
import { CreateComplementDto } from './dto/create-complement.dto';
import { UpdateComplementDto } from './dto/update-complement.dto';

@Controller('complement')
export class ComplementController {
  constructor(private readonly complementService: ComplementService) {}

  @Get()
  findAll() {
    return this.complementService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.complementService.findOneById(id);
  }

  @Post()
  create(@Body() payload: CreateComplementDto) {
    return this.complementService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateComplementDto) {
    return this.complementService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.complementService.delete(id);
  }
}
