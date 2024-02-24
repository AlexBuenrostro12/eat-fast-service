import { Product } from 'src/product/entity/product.entity';
import { COLOGNE } from 'src/shared/enum/cologne.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Product, (product) => product.business)
  product: Product[];

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: COLOGNE,
  })
  cologne: COLOGNE;

  @Column()
  phone: number;

  @Column()
  address: string;

  @Column()
  open: number;

  @Column()
  close: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
