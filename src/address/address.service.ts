import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entity/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  findAll() {
    return this.addressRepository.find();
  }

  async findOneById(id: number) {
    const address = await this.addressRepository.findOne({
      where: { id },
    });

    if (!address) {
      throw new NotFoundException(`Address with #${id} not found`);
    }

    return address;
  }

  async create(payload: CreateAddressDto) {
    const address = this.addressRepository.create({ ...payload });

    return await this.addressRepository.save(address);
  }

  async update(id: number, payload: UpdateAddressDto) {
    const address = await this.addressRepository.preload({
      id,
      ...payload,
    });

    if (!address) {
      throw new NotFoundException(`Address with #${id} not found`);
    }

    return this.addressRepository.save(address);
  }

  async delete(id: number) {
    return await this.addressRepository.softDelete(id);
  }
}
