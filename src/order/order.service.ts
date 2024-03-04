import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/oder.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { ProductService } from 'src/product/product.service';
import { CreateOrderDetailDto } from 'src/order-detail/dto/create-order-detail.dto';
import { STATUS } from './enum/order.enum';
import { OrderDetail } from 'src/order-detail/entity/oder-detail.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly orderDetailService: OrderDetailService,
    private readonly productService: ProductService,
    private readonly dataSource: DataSource,
  ) {}

  findAll() {
    return this.orderRepository.find({
      relations: {
        orderDetail: {
          product: {
            ingredient: true,
            complement: true,
          },
        },
      },
    });
  }

  async findOneById(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        orderDetail: {
          product: {
            ingredient: true,
            complement: true,
          },
        },
        user: {
          address: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with #${id} not found`);
    }

    const filteredOrderDetail = order.orderDetail.map((od) => {
      const filteredIngredient = od.product.ingredient.filter((ingredient) => {
        if (od.ingredientIds.find((id) => id === ingredient.id))
          return ingredient;
      });
      const filteredComplement = od.product.complement.filter((complement) => {
        if (od.complementIds.find((id) => id === complement.id))
          return complement;
      });

      return {
        ...od,
        product: {
          ...od.product,
          ingredient: filteredIngredient,
          complement: filteredComplement,
        },
      };
    });

    return {
      ...order,
      orderDetail: filteredOrderDetail,
    };
  }

  async create({ userId, orders }: CreateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderDetailPayload: Array<CreateOrderDetailDto> = [];
      let total = 0;

      for (const order of orders) {
        const product = await this.productService.findOneById(order.productId);
        if (product) {
          total = total + product.price * order.quantity;
          orderDetailPayload.push({
            ...order,
            product,
          });
        }
      }

      const orderDetail = await this.orderDetailService.createMany(
        orderDetailPayload,
      );

      const order = this.orderRepository.create({
        status: STATUS.PENDING,
        total,
        user: { id: userId },
      });

      const orderResponse = await queryRunner.manager.save(Order, order);

      const linkedOrderDetail = orderDetail.map((od) => ({
        ...od,
        order: { id: orderResponse.id },
      }));

      await queryRunner.manager.save(OrderDetail, linkedOrderDetail);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, payload: UpdateOrderDto) {
    const order = await this.orderRepository.preload({
      id,
      ...payload,
    });

    if (!order) {
      throw new NotFoundException(`Order with #${id} not found`);
    }

    return this.orderRepository.save(order);
  }

  async delete(id: number) {
    return await this.orderRepository.softDelete(id);
  }
}
