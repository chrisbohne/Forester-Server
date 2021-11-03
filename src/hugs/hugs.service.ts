import { Injectable } from '@nestjs/common';
import { CreateHugDto } from './dto/create-hug.dto';
import { UpdateHugDto } from './dto/update-hug.dto';

@Injectable()
export class HugsService {
  create(createHugDto: CreateHugDto) {
    return 'This action adds a new hug';
  }

  findAll() {
    return `This action returns all hugs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hug`;
  }

  update(id: number, updateHugDto: UpdateHugDto) {
    return `This action updates a #${id} hug`;
  }

  remove(id: number) {
    return `This action removes a #${id} hug`;
  }
}
