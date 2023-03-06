import { Module } from '@nestjs/common';
import { GeneratorsController } from './generators.controller';
import { GeneratorsService } from './generators.service';

@Module({
  controllers: [GeneratorsController],
  providers: [GeneratorsService]
})
export class GeneratorsModule {}
