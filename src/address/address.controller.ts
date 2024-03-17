import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.addressService.findOneById(id);
  }

  @Post()
  create(@Body() payload: CreateAddressDto) {
    return this.addressService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateAddressDto) {
    return this.addressService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.addressService.delete(id);
  }
}
