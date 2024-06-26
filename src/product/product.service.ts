import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { Ingredient } from 'src/ingredient/entity/ingredient.entity';
import { BusinessService } from 'src/business/business.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly ingredientService: IngredientService,
    private readonly businessService: BusinessService,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: ['ingredient'],
    });
  }

  async findOneById(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['ingredient'],
    });

    if (!product) {
      throw new NotFoundException(`Product with #${id} not found`);
    }

    return product;
  }

  async createByBusinessId({
    businessId,
    ingredients,
    ...payload
  }: CreateProductDto) {
    const business = await this.businessService.findOneById(businessId);

    if (!business) {
      throw new NotFoundException(`Business with #${businessId} not found`);
    }

    const arrayOfIngredientsPromise: Array<Promise<Ingredient>> = [];
    ingredients.forEach((ingredient) => {
      arrayOfIngredientsPromise.push(this.ingredientService.create(ingredient));
    });
    const newIngredients = await Promise.all(arrayOfIngredientsPromise);
    const product = this.productRepository.create({
      ...payload,
    });

    product.ingredient = [...newIngredients];

    const newProduct = await this.productRepository.save(product);

    if (newProduct) {
      await this.businessService.update(businessId, {
        product: [...business.product, newProduct],
      });
    }

    return newProduct;
  }

  async update(
    id: number,
    {
      name,
      description,
      price,
      ingredient,
      inStock,
      type,
      minPrice,
      maxPrice,
    }: UpdateProductDto,
  ) {
    const product = await this.findOneById(id);

    if (!product) {
      throw new NotFoundException(`Product with #${id} not found`);
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (inStock !== undefined) product.inStock = inStock;
    if (ingredient) product.ingredient = [...product.ingredient, ...ingredient];
    if (type) product.type = type;
    if (minPrice) product.minPrice = minPrice;
    if (maxPrice) product.maxPrice = minPrice;

    return this.productRepository.save(product);
  }

  async updateImage(id: number, image?: string) {
    const product = await this.findOneById(id);

    if (product) {
      product.image = image || null;
    }

    return this.productRepository.save(product);
  }

  async delete(id: number) {
    return await this.productRepository.softDelete(id);
  }
}
