import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entity/business.entity';
import { Address } from 'src/address/entity/address.entity';
import { AddressService } from 'src/address/address.service';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Business, Address, User])],
  controllers: [BusinessController],
  providers: [BusinessService, AddressService, UserService],
})
export class BusinessModule {}
