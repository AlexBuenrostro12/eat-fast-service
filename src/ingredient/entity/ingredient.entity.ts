import { Product } from 'src/product/entity/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { INGREDIENT_TYPE } from '../enum/ingredient-type.enum';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.ingredient)
  product: Product;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  required: boolean;

  @Column({ type: 'enum', enum: INGREDIENT_TYPE })
  type: INGREDIENT_TYPE;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
