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
    private readonly orderDetailService: Repository<OrderDetail>,
  ) {}

  findAll() {
    return this.orderDetailService.find();
  }

  async findOneById(id: number) {
    const orderDetail = await this.orderDetailService.findOne({
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
    const orderDetail = this.orderDetailService.create({ ...payload });

    return await this.orderDetailService.save(orderDetail);
  }

  async update(id: number, payload: UpdateOrderDetailDto) {
    const orderDetail = await this.orderDetailService.preload({
      id,
      ...payload,
    });

    if (!orderDetail) {
      throw new NotFoundException(`Order detail with #${id} not found`);
    }

    return this.orderDetailService.save(orderDetail);
  }

  async delete(id: number) {
    return await this.orderDetailService.softDelete(id);
  }
}
