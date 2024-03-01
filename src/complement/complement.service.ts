import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complement } from './entity/complement.entity';
import { CreateComplementDto } from './dto/create-complement.dto';
import { UpdateComplementDto } from './dto/update-complement.dto';

@Injectable()
export class ComplementService {
  constructor(
    @InjectRepository(Complement)
    private readonly complementRepository: Repository<Complement>,
  ) {}

  findAll() {
    return this.complementRepository.find();
  }

  async findOneById(id: number) {
    const complement = await this.complementRepository.findOne({
      where: { id },
    });

    if (!complement) {
      throw new NotFoundException(`Complement with #${id} not found`);
    }

    return complement;
  }

  async create(payload: CreateComplementDto) {
    const complement = this.complementRepository.create({ ...payload });

    return await this.complementRepository.save(complement);
  }

  async update(id: number, payload: UpdateComplementDto) {
    const complement = await this.complementRepository.preload({
      id,
      ...payload,
    });

    if (!complement) {
      throw new NotFoundException(`Complement with #${id} not found`);
    }

    return this.complementRepository.save(complement);
  }

  async delete(id: number) {
    return await this.complementRepository.softDelete(id);
  }
}
