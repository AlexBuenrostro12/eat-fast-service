import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entity/ingredient.entity';
import { In, Repository } from 'typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  findAll() {
    return this.ingredientRepository.find();
  }

  async findOneById(id: number) {
    const ingredient = await this.ingredientRepository.findOne({
      where: { id },
    });

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with #${id} not found`);
    }

    return ingredient;
  }

  async findManyById(ids: Array<number>) {
    const orderedIngredient = await this.ingredientRepository.find({
      where: { id: In(ids) },
    });

    if (!orderedIngredient) {
      throw new NotFoundException(
        `Ingredient with #${ids.join(', ')} not found`,
      );
    }

    return orderedIngredient;
  }

  async create(payload: CreateIngredientDto) {
    const ingredient = this.ingredientRepository.create({ ...payload });

    return await this.ingredientRepository.save(ingredient);
  }

  async update(id: number, payload: UpdateIngredientDto) {
    const ingredient = await this.ingredientRepository.preload({
      id,
      ...payload,
    });

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with #${id} not found`);
    }

    return this.ingredientRepository.save(ingredient);
  }

  async delete(id: number) {
    return await this.ingredientRepository.softDelete(id);
  }
}
