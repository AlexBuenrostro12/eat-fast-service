import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entity/business.entity';
import { Repository } from 'typeorm';
import { CreateBusinessDto } from './dto/create-business.dto';
import { AddressService } from 'src/address/address.service';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    private readonly addressService: AddressService,
    private readonly userService: UserService,
  ) {}

  findAll(userId: number) {
    return this.businessRepository.find({
      where: { user: { id: userId } },
      relations: {
        address: true,
        product: {
          ingredient: true,
        },
      },
    });
  }

  async findOneById(id: number, userId: number) {
    const business = await this.businessRepository.findOne({
      where: { id, user: { id: userId } },
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

  async create({ address, ...payload }: CreateBusinessDto, userId: number) {
    const user = await this.userService.findOneById(userId);
    const newAddress = await this.addressService.create(address);

    const business = this.businessRepository.create({
      ...payload,
    });

    business.user = user;
    business.address = newAddress;

    return await this.businessRepository.save(business);
  }

  async update(
    id: number,
    userId: number,
    { name, phone, address, start, end, open, product }: UpdateBusinessDto,
  ) {
    const business = await this.findOneById(id, userId);

    if (!business) {
      throw new NotFoundException(`Business with #${id} not found`);
    }

    if (name) business.name = name;
    if (phone) business.phone = phone;
    if (address)
      business.address = {
        ...business.address,
        ...address,
      };
    if (start) business.start = start;
    if (end) business.end = end;
    if (open) business.open = open;
    if (product) business.product = [...business.product, ...product];

    return this.businessRepository.save(business);
  }

  async delete(id: number) {
    return await this.businessRepository.softDelete(id);
  }
}
