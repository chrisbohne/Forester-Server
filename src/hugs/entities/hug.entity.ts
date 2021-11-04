import { Hug } from '.prisma/client';

export class HugEntity implements Hug {
  id: number;
  message: string;
  huggedAt: Date;
  duration: number;
  experience: number;
  treeId: number;
  userId: number;

  constructor(partial: Partial<HugEntity>) {
    Object.assign(this, partial);
  }
}
