import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/oder.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { CreateOrderDetailDto } from 'src/order-detail/dto/create-order-detail.dto';
import { STATUS } from './enum/order.enum';
import { OrderDetail } from 'src/order-detail/entity/oder-detail.entity';
import { ProductService } from 'src/product/product.service';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { OrderedProductService } from 'src/ordered-product/ordered-product.service';
import { OrderedIngredientService } from 'src/ordered-ingredient/odered-ingredient.service';
import { CreateOrderedIngredientDto } from 'src/ordered-ingredient/dto/create-ordered-ingredient.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly orderDetailService: OrderDetailService,
    private readonly productService: ProductService,
    private readonly orderedProductService: OrderedProductService,
    private readonly ingredientsService: IngredientService,
    private readonly orderedIngredientsService: OrderedIngredientService,
    private readonly dataSource: DataSource,
  ) {}

  findAll() {
    return this.orderRepository.find({
      relations: {
        orderDetail: {
          product: true,
          ingredients: true,
        },
      },
    });
  }

  async findOneById(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        orderDetail: {
          product: true,
          ingredients: true,
        },
        user: {
          address: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with #${id} not found`);
    }

    return order;
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
        const ingredients = await this.ingredientsService.findManyById(
          order.ingredientIds,
        );
        const orderedIngredientsPayload: Array<CreateOrderedIngredientDto> =
          ingredients.map(({ name, description, type }) => ({
            name,
            description,
            type,
          }));

        const orderedIngredients =
          await this.orderedIngredientsService.createMany(
            orderedIngredientsPayload,
          );

        const orderedProduct = await this.orderedProductService.create({
          name: product.name,
          description: product.description,
          price: product.price,
        });

        if (product) {
          total = total + product.price * order.quantity;
          orderDetailPayload.push({
            ...order,
            product: orderedProduct,
            ingredients: orderedIngredients,
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

  async update(id: number, { status, total }: UpdateOrderDto) {
    const order = await this.findOneById(id);

    if (!order) {
      throw new NotFoundException(`Order with #${id} not found`);
    }

    if (status) order.status = status;
    if (total) order.total = total;

    return this.orderRepository.save(order);
  }

  async delete(id: number) {
    return await this.orderRepository.softDelete(id);
  }
}
