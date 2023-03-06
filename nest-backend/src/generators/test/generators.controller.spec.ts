import { Test, TestingModule } from '@nestjs/testing';
import { GeneratorsController } from '../generators.controller';

describe('GeneratorsController', () => {
  let controller: GeneratorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneratorsController],
    }).compile();

    controller = module.get<GeneratorsController>(GeneratorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
