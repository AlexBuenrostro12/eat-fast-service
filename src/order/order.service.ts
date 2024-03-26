import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/oder.entity';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
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
import { USER_ROLE } from 'src/user/enum/user-role.enum';
import { ResponseOrderDto } from './dto/response-order.dto';
import { PRODUCT_TYPE } from 'src/user/enum/product.enum';

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

  findAll(userId: number, role: USER_ROLE) {
    let condition: FindOptionsWhere<Order> | FindOptionsWhere<Order>[] = {};

    if (role === USER_ROLE.USER) {
      condition = { user: { id: userId } };
    }

    return this.orderRepository.find({
      where: condition,
      relations: {
        business: true,
        user: {
          address: true,
        },
        orderDetail: {
          product: true,
          ingredients: true,
        },
      },
      select: {
        user: {
          firstname: true,
          lastname: true,
          phone: true,
          address: {
            street: true,
            number: true,
            cologne: true,
          },
        },
      },
    });
  }

  async findOneById(id: number, userId: number) {
    const order = await this.orderRepository.findOne({
      where: { id, user: { id: userId } },
      relations: {
        business: true,
        user: {
          address: true,
        },
        orderDetail: {
          product: true,
          ingredients: true,
        },
      },
      select: {
        user: {
          firstname: true,
          lastname: true,
          phone: true,
          address: {
            street: true,
            number: true,
            cologne: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with #${id} not found`);
    }

    return order;
  }

  async create(
    userId: number,
    { businessId, total, orders }: CreateOrderDto,
  ): Promise<ResponseOrderDto> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderDetailPayload: Array<CreateOrderDetailDto> = [];

      for (const order of orders) {
        const product = await this.productService.findOneById(
          order.productId,
          userId,
        );
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

        const price =
          product.type === PRODUCT_TYPE.ORDER
            ? order.orderPrice
            : product.price;
        const orderedProduct = await this.orderedProductService.create({
          name: product.name,
          description: product.description,
          price,
        });

        if (product) {
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
        business: { id: businessId },
      });

      const orderResponse = await queryRunner.manager.save(Order, order);

      const linkedOrderDetail = orderDetail.map((od) => ({
        ...od,
        order: { id: orderResponse.id },
      }));

      await queryRunner.manager.save(OrderDetail, linkedOrderDetail);

      await queryRunner.commitTransaction();

      return { created: true };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return { created: false, error };
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, userId: number, { status, total }: UpdateOrderDto) {
    const order = await this.findOneById(id, userId);

    if (!order) {
      throw new NotFoundException(`Order with #${id} not found`);
    }

    if (status) order.status = status;
    if (total) order.total = total;

    return this.orderRepository.save(order);
  }

  async delete(id: number, userId: number) {
    return await this.orderRepository.softDelete({ id, user: { id: userId } });
  }
}
