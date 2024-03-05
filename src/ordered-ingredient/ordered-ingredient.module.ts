import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderedIngredient } from './entity/odered-ingredient.entity';
import { OrderedIngredientController } from './odered-ingredient.controller';
import { OrderedIngredientService } from './odered-ingredient.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderedIngredient])],
  controllers: [OrderedIngredientController],
  providers: [OrderedIngredientService],
})
export class OrderedIngredientModule {}
