import { PartialType } from '@nestjs/swagger';
import { CreateHugDto } from './create-hug.dto';

export class UpdateHugDto extends PartialType(CreateHugDto) {}
