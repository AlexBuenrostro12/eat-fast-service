import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddressService } from 'src/address/address.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly addressService: AddressService,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['address'],
    });

    if (!user) {
      throw new NotFoundException(`User with #${id} not found`);
    }

    return user;
  }

  async create({ address, email, password, ...payload }: CreateUserDto) {
    await this.validateEmail(email);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAddress = await this.addressService.create(address);

    const user = this.userRepository.create({ ...payload });
    user.email = email;
    user.password = hashedPassword;
    user.address = newAddress;

    const createdUser = await this.userRepository.save(user);
    delete createdUser.password;

    return createdUser;
  }

  async update(
    id: number,
    { firstname, lastname, phone, address }: UpdateUserDto,
  ) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new NotFoundException(`User with #${id} not found`);
    }

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (phone) user.phone = phone;

    if (address)
      user.address = {
        ...user.address,
        street: address.street,
        number: address.number,
        cologne: address.cologne,
      };

    return this.userRepository.save(user);
  }

  async updateEmail(id: number, { oldEmail, newEmail }: UpdateUserEmailDto) {
    const user = await this.findOneByEmail(id, oldEmail);

    if (user) {
      user.email = newEmail;
    }

    return this.userRepository.save(user);
  }

  async delete(id: number) {
    return await this.userRepository.softDelete(id);
  }

  private async validateEmail(email: string) {
    const exist = await this.userRepository.findOne({ where: { email } });

    if (exist) {
      throw new BadRequestException(`Email: ${email} already exists`);
    }
  }

  private async findOneByEmail(id: number, email: string) {
    const user = await this.userRepository.findOne({ where: { id, email } });

    if (!user) {
      throw new NotFoundException(`User with email: ${email} not exist`);
    }

    return user;
  }
}
