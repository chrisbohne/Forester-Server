import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  id: number;
  @IsNotEmpty()
  @MinLength(3)
  username: string;
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  experience: number;
}
