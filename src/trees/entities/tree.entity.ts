import { Tree } from '.prisma/client';
// import { Exclude } from 'class-transformer';

export class TreeEntity implements Tree {
  id: number;
  name: string;
  createdAt: Date;
  long: number;
  lat: number;
  photo: string;
  userId: number;

  constructor(partial: Partial<TreeEntity>) {
    Object.assign(this, partial);
  }
}
