import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';

@Injectable()
export class TreesService {
  constructor(private prisma: PrismaService) {}

  async create(createTreeDto: CreateTreeDto, userId: number) {
    return await this.prisma.tree.create({
      data: {
        ...createTreeDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.tree.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.tree.findUnique({
      where: { id: id },
      include: { user: true },
    });
  }

  async update(id: number, updateTreeDto: UpdateTreeDto) {
    return await this.prisma.tree.update({
      where: { id: id },
      data: updateTreeDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.tree.delete({ where: { id: id } });
  }
}
