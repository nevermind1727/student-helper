import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  password: string;
}
