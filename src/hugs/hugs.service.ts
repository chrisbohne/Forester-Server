import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHugDto } from './dto/create-hug.dto';
import { UpdateHugDto } from './dto/update-hug.dto';

@Injectable()
export class HugsService {
  constructor(private prisma: PrismaService) {}

  async create(createHugDto: CreateHugDto, userId: number, treeId: number) {
    return await this.prisma.hug.create({
      data: {
        ...createHugDto,
        user: {
          connect: {
            id: userId,
          },
        },
        tree: {
          connect: {
            id: treeId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.hug.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.hug.findUnique({
      where: { id: id },
      include: { user: true, tree: true },
    });
  }

  update(id: number, updateHugDto: UpdateHugDto) {
    return this.prisma.hug.update({ where: { id: id }, data: updateHugDto });
  }

  async remove(id: number) {
    return await this.prisma.hug.delete({ where: { id: id } });
  }
}
