import { Test, TestingModule } from '@nestjs/testing';
import { HugsController } from './hugs.controller';
import { HugsService } from './hugs.service';

describe('HugsController', () => {
  let controller: HugsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HugsController],
      providers: [HugsService],
    }).compile();

    controller = module.get<HugsController>(HugsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
