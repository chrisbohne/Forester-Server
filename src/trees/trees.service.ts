import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';

@Injectable()
export class TreesService {
  constructor(private prisma: PrismaService) {}

  async create(tree: CreateTreeDto, userId: number) {
    return await this.prisma.tree.create({
      data: {
        ...tree,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.tree.findMany();
  }

  findOne(id: number) {
    return this.prisma.tree.findUnique({
      where: { id: id },
      include: { user: true },
    });
  }

  update(id: number, updateTreeDto: UpdateTreeDto) {
    return `This action updates a #${id} tree`;
  }

  remove(id: number) {
    return `This action removes a #${id} tree`;
  }
}
