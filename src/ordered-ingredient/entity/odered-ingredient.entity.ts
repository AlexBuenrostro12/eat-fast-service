import { OrderDetail } from 'src/order-detail/entity/oder-detail.entity';
import { INGREDIENT_TYPE } from 'src/shared/enum/ingredient-type.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrderedIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail.ingredients)
  orderDetail: OrderDetail;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: INGREDIENT_TYPE })
  type: INGREDIENT_TYPE;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
