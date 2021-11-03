import { Test, TestingModule } from '@nestjs/testing';
import { HugsService } from './hugs.service';

describe('HugsService', () => {
  let service: HugsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HugsService],
    }).compile();

    service = module.get<HugsService>(HugsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
