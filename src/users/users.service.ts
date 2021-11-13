import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id: id },
      include: { trees: true },
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id: id } });
  }
}
