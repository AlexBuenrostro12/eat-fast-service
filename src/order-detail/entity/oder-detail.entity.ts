import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from 'src/order/entity/oder.entity';
import { Product } from 'src/product/entity/product.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderDetail)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetail)
  product: Product;

  @Column('int', { array: true })
  ingredientIds: Array<number>;

  @Column('int', { array: true })
  complementIds: Array<number>;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
