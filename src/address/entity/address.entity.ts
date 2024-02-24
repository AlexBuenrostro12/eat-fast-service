import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { COLOGNE } from '../enum/address.enum';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column({
    type: 'enum',
    enum: COLOGNE,
  })
  cologne: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
