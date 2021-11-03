import { User } from '.prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: number;
  username: string;
  email: string;
  @Exclude()
  password: string;
  experience: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
