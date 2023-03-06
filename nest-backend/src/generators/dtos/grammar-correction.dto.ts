import { IsString } from 'class-validator';

export class GrammarCorrectionDto {
  @IsString()
  prompt: string;
}
