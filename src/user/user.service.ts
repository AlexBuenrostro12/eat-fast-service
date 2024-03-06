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

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...payload,
    });

    if (!user) {
      throw new NotFoundException(`User with #${id} not found`);
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
}
