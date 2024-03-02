import { Business } from 'src/business/entity/business.entity';
import { Complement } from 'src/complement/entity/complement.entity';
import { Ingredient } from 'src/ingredient/entity/ingredient.entity';
import { OrderDetail } from 'src/order-detail/entity/oder-detail.entity';
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

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Business, (business) => business.product)
  business: Business;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetail: OrderDetail[];

  @OneToMany(() => Ingredient, (ingredient) => ingredient.product)
  ingredient: Ingredient[];

  @OneToMany(() => Complement, (complement) => complement.product)
  complement: Complement[];

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
