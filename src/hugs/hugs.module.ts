import { Module } from '@nestjs/common';
import { HugsService } from './hugs.service';
import { HugsController } from './hugs.controller';

@Module({
  controllers: [HugsController],
  providers: [HugsService]
})
export class HugsModule {}
