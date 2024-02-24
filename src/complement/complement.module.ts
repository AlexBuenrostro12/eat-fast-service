import { Module } from '@nestjs/common';
import { ComplementController } from './complement.controller';
import { ComplementService } from './complement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complement } from './entity/complement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Complement])],
  controllers: [ComplementController],
  providers: [ComplementService],
})
export class ComplementModule {}
