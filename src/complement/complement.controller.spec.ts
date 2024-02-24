import { Test, TestingModule } from '@nestjs/testing';
import { ComplementController } from './complement.controller';

describe('ComplementController', () => {
  let controller: ComplementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplementController],
    }).compile();

    controller = module.get<ComplementController>(ComplementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
