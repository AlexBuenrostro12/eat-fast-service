import { Address } from 'src/address/entity/address.entity';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.business)
  user: User;

  @OneToMany(() => Product, (product) => product.business)
  product: Product[];

  @Column()
  name: string;

  @Column({ type: 'bigint' })
  phone: number;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @Column()
  start: string;

  @Column()
  end: string;

  @Column()
  open: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
