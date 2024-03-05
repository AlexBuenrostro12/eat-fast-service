import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from 'src/order/entity/oder.entity';
import { Product } from 'src/product/entity/product.entity';
import { OrderedProduct } from 'src/ordered-product/entity/ordered-product.entity';
import { OrderedIngredient } from 'src/ordered-ingredient/entity/odered-ingredient.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderDetail)
  order: Order;

  @ManyToOne(
    () => OrderedProduct,
    (orderedProduct) => orderedProduct.orderDetail,
  )
  product: OrderedProduct;

  @OneToMany(
    () => OrderedIngredient,
    (orderedIngredient) => orderedIngredient.orderDetail,
  )
  ingredients: OrderedIngredient[];

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
