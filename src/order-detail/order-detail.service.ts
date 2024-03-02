import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entity/oder-detail.entity';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  findAll() {
    return this.orderDetailRepository.find();
  }

  async findOneById(id: number) {
    const orderDetail = await this.orderDetailRepository.findOne({
      where: { id },
      relations: {
        order: true,
        product: { ingredient: true, complement: true },
      },
    });

    if (!orderDetail) {
      throw new NotFoundException(`Order detail with #${id} not found`);
    }

    return orderDetail;
  }

  async create(payload: CreateOrderDetailDto) {
    const orderDetail = this.orderDetailRepository.create(payload);

    return await this.orderDetailRepository.save(orderDetail);
  }

  async update(id: number, payload: UpdateOrderDetailDto) {
    const orderDetail = await this.orderDetailRepository.preload({
      id,
      ...payload,
    });

    if (!orderDetail) {
      throw new NotFoundException(`Order detail with #${id} not found`);
    }

    return this.orderDetailRepository.save(orderDetail);
  }

  async delete(id: number) {
    return await this.orderDetailRepository.softDelete(id);
  }
}
