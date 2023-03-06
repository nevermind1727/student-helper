import { Test, TestingModule } from '@nestjs/testing';
import { GeneratorsService } from '../generators.service';

describe('GeneratorsService', () => {
  let service: GeneratorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneratorsService],
    }).compile();

    service = module.get<GeneratorsService>(GeneratorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
