import { IsInt, IsString, Max, Min } from 'class-validator';

export class GenerateStudyNotesDto {
  @IsInt()
  @Min(1)
  @Max(50)
  points: number;
  @IsString()
  subject: string;
}
