import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HugsService } from './hugs.service';
import { CreateHugDto } from './dto/create-hug.dto';
import { UpdateHugDto } from './dto/update-hug.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('hugs')
@ApiTags('hugs')
export class HugsController {
  constructor(private readonly hugsService: HugsService) {}

  @Post()
  create(@Body() createHugDto: CreateHugDto) {
    return this.hugsService.create(createHugDto);
  }

  @Get()
  findAll() {
    return this.hugsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hugsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHugDto: UpdateHugDto) {
    return this.hugsService.update(+id, updateHugDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hugsService.remove(+id);
  }
}
