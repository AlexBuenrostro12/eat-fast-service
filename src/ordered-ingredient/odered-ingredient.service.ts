import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderedIngredient } from './entity/odered-ingredient.entity';
import { CreateOrderedIngredientDto } from './dto/create-ordered-ingredient.dto';
import { UpdateOrderedIngredientDto } from './dto/update-ordered-ingredient.dto';

@Injectable()
export class OrderedIngredientService {
  constructor(
    @InjectRepository(OrderedIngredient)
    private readonly orderedIngredientRepository: Repository<OrderedIngredient>,
  ) {}

  findAll() {
    return this.orderedIngredientRepository.find();
  }

  async findOneById(id: number) {
    const orderedIngredient = await this.orderedIngredientRepository.findOne({
      where: { id },
    });

    if (!orderedIngredient) {
      throw new NotFoundException(`Ordered ingredient with #${id} not found`);
    }

    return orderedIngredient;
  }

  async createMany(payload: Array<CreateOrderedIngredientDto>) {
    const orderedIngredients = this.orderedIngredientRepository.create(payload);

    return await this.orderedIngredientRepository.save(orderedIngredients);
  }

  async create(payload: CreateOrderedIngredientDto) {
    const orderedIngredient = this.orderedIngredientRepository.create({
      ...payload,
    });

    return await this.orderedIngredientRepository.save(orderedIngredient);
  }

  async update(id: number, payload: UpdateOrderedIngredientDto) {
    const orderedIngredient = await this.orderedIngredientRepository.preload({
      id,
      ...payload,
    });

    if (!orderedIngredient) {
      throw new NotFoundException(`Ingredient with #${id} not found`);
    }

    return this.orderedIngredientRepository.save(orderedIngredient);
  }

  async delete(id: number) {
    return await this.orderedIngredientRepository.softDelete(id);
  }
}
