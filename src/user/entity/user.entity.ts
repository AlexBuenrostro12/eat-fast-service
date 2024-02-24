import { Address } from 'src/address/entity/address.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO: run migration
  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @Column()
  orderId: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  passsword: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
