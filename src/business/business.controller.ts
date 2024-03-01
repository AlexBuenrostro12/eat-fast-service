import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get()
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.businessService.findOneById(id);
  }

  @Post()
  create(@Body() payload: CreateBusinessDto) {
    return this.businessService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateBusinessDto) {
    return this.businessService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.businessService.delete(id);
  }
}
