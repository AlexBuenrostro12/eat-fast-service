import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/address/entity/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [UserController],
  providers: [UserService, AddressService],
  exports: [TypeOrmModule.forFeature([User, Address])],
})
export class UserModule {}
