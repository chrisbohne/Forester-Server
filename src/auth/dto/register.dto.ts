import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  experience: number;
}
