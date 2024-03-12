import { Address } from 'src/address/entity/address.entity';
import { Business } from 'src/business/entity/business.entity';
import { Order } from 'src/order/entity/oder.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @OneToMany(() => Business, (business) => business.user)
  business: Business[];

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column({ type: 'bigint' })
  phone: number;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
