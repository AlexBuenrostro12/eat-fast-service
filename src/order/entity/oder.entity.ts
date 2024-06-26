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
import { STATUS } from '../enum/order.enum';
import { User } from 'src/user/entity/user.entity';
import { OrderDetail } from 'src/order-detail/entity/oder-detail.entity';
import { Business } from 'src/business/entity/business.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToOne(() => Business, (business) => business.order)
  business: Business;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetail[];

  @Column({
    type: 'enum',
    enum: STATUS,
  })
  status: STATUS;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
