import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderedProduct } from './entity/ordered-product.entity';
import { CreateOrderedProductDto } from './dto/create-ordered-product.dto';
import { UpdateOrderedProductDto } from './dto/update-ordered-product.dto';

@Injectable()
export class OrderedProductService {
  constructor(
    @InjectRepository(OrderedProduct)
    private readonly orderedProductRepository: Repository<OrderedProduct>,
  ) {}

  findAll() {
    return this.orderedProductRepository.find();
  }

  async findOneById(id: number) {
    const orderedProduct = await this.orderedProductRepository.findOne({
      where: { id },
    });

    if (!orderedProduct) {
      throw new NotFoundException(`Ordered product with #${id} not found`);
    }

    return orderedProduct;
  }

  async create(payload: CreateOrderedProductDto) {
    const orderedProduct = this.orderedProductRepository.create({ ...payload });

    return await this.orderedProductRepository.save(orderedProduct);
  }

  async update(id: number, payload: UpdateOrderedProductDto) {
    const orderedProduct = await this.orderedProductRepository.preload({
      id,
      ...payload,
    });

    if (!orderedProduct) {
      throw new NotFoundException(`Ordered product with #${id} not found`);
    }

    return this.orderedProductRepository.save(orderedProduct);
  }

  async delete(id: number) {
    return await this.orderedProductRepository.softDelete(id);
  }
}
