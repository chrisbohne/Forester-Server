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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HugEntity } from './entities/hug.entity';

@Controller('hugs')
@ApiTags('hugs')
export class HugsController {
  constructor(private readonly hugsService: HugsService) {}

  @Post('new/:userId/:treeId')
  @ApiCreatedResponse({ type: HugEntity })
  async create(
    @Body() createHugDto: CreateHugDto,
    @Param('userId') userId: string,
    @Param('treeId') treeId: string,
  ) {
    return new HugEntity(
      await this.hugsService.create(createHugDto, +userId, +treeId),
    );
  }

  @Get()
  @ApiOkResponse({ type: HugEntity })
  async findAll() {
    const hugs = await this.hugsService.findAll();
    return hugs.map((hug) => new HugEntity(hug));
  }

  @Get(':id')
  @ApiOkResponse({ type: HugEntity })
  async findOne(@Param('id') id: string) {
    return new HugEntity(await this.hugsService.findOne(+id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: HugEntity })
  async update(@Param('id') id: string, @Body() updateHugDto: UpdateHugDto) {
    return new HugEntity(await this.hugsService.update(+id, updateHugDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: HugEntity })
  async remove(@Param('id') id: string) {
    return new HugEntity(await this.hugsService.remove(+id));
  }
}
