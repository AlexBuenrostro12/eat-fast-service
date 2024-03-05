import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entity/business.entity';
import { Repository } from 'typeorm';
import { CreateBusinessDto } from './dto/create-business.dto';
import { AddressService } from 'src/address/address.service';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    private readonly addressService: AddressService,
  ) {}

  findAll() {
    return this.businessRepository.find({
      relations: {
        address: true,
        product: {
          ingredient: true,
        },
      },
    });
  }

  async findOneById(id: number) {
    const business = await this.businessRepository.findOne({
      where: { id },
      relations: {
        address: true,
        product: {
          ingredient: true,
        },
      },
    });

    if (!business) {
      throw new NotFoundException(`Business with #${id} not found`);
    }

    return business;
  }

  async create({ address, ...payload }: CreateBusinessDto) {
    const newAddress = await this.addressService.create(address);

    const user = this.businessRepository.create({ ...payload });
    user.address = newAddress;

    return await this.businessRepository.save(user);
  }

  async update(id: number, payload: UpdateBusinessDto) {
    const business = await this.businessRepository.preload({
      id,
      ...payload,
    });

    if (!business) {
      throw new NotFoundException(`Business with #${id} not found`);
    }

    return this.businessRepository.save(business);
  }

  async delete(id: number) {
    return await this.businessRepository.softDelete(id);
  }
}
