import { Business } from 'src/business/entity/business.entity';
import { Ingredient } from 'src/ingredient/entity/ingredient.entity';
import { PRODUCT_TYPE } from 'src/user/enum/product.enum';
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

  @OneToMany(() => Ingredient, (ingredient) => ingredient.product)
  ingredient: Ingredient[];

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: true })
  inStock: boolean;

  @Column({ type: 'enum', enum: PRODUCT_TYPE, default: PRODUCT_TYPE.REGULAR })
  type: PRODUCT_TYPE;

  @Column({ default: 0 })
  minPrice: number;

  @Column({ default: 0 })
  maxPrice: number;

  @Column({ nullable: true, default: null })
  image?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
