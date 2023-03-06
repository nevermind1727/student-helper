import { IsInt, IsString, Max } from 'class-validator';

export class EssayGeneratorDto {
  @IsInt()
  @Max(50)
  sentences: number;
  @IsString()
  subject: string;
}
