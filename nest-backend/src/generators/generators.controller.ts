import { Body, Controller, Post } from '@nestjs/common';
import { EssayGeneratorDto } from './dtos/essay-generator.dto';
import { GenerateStudyNotesDto } from './dtos/generate-study-notes.dto';
import { GrammarCorrectionDto } from './dtos/grammar-correction.dto';
import { GeneratorsService } from './generators.service';

@Controller('generators')
export class GeneratorsController {
  constructor(private readonly generatorsService: GeneratorsService) {}

  @Post('/studyNotes')
  async generateStudyNotes(
    @Body() generateStudyNotesParams: GenerateStudyNotesDto,
  ) {
    return this.generatorsService.generateStudyNotes(generateStudyNotesParams);
  }

  @Post('/grammarCorrection')
  async grammarCorrection(
    @Body() grammarCorrectionParams: GrammarCorrectionDto,
  ) {
    return this.generatorsService.grammarCorrection(grammarCorrectionParams);
  }

  @Post('/essayGenerator')
  async essayGenerator(@Body() essayGeneratorParams: EssayGeneratorDto) {
    return this.generatorsService.essayGenerator(essayGeneratorParams);
  }
}
