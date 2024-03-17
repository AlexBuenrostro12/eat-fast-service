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
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';

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
  create(@Body() payload: CreateBusinessDto, @Request() req: AuthUserDto) {
    return this.businessService.create(payload, req.user.id);
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
