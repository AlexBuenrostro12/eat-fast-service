import { Test, TestingModule } from '@nestjs/testing';
import { ComplementService } from './complement.service';

describe('ComplementService', () => {
  let service: ComplementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplementService],
    }).compile();

    service = module.get<ComplementService>(ComplementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
