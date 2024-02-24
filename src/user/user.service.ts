import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with #${id} not found`);
    }

    return user;
  }

  async create(payload: CreateUserDto) {
    const user = this.userRepository.create({ ...payload });
    return this.userRepository.save(user);
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
}
