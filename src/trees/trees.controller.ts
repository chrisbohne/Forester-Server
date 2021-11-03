import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TreesService } from './trees.service';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TreeEntity } from './entities/tree.entity';

@Controller('trees')
@ApiTags('trees')
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @Post(':userId')
  @ApiCreatedResponse({ type: TreeEntity })
  async create(
    @Body() createTreeDto: CreateTreeDto,
    @Param('userId') id: string,
  ) {
    return new TreeEntity(await this.treesService.create(createTreeDto, +id));
  }

  @Get()
  @ApiOkResponse({ type: [TreeEntity] })
  async findAll() {
    const trees = await this.treesService.findAll();
    return trees.map((tree) => new TreeEntity(tree));
  }

  @Get(':id')
  @ApiOkResponse({ type: TreeEntity })
  async findOne(@Param('id') id: string) {
    return new TreeEntity(await this.treesService.findOne(+id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTreeDto: UpdateTreeDto) {
    return this.treesService.update(+id, updateTreeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treesService.remove(+id);
  }
}
