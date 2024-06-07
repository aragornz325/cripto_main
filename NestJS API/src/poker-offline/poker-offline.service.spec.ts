import { Test, TestingModule } from '@nestjs/testing';
import { PokerOfflineService } from './poker-offline.service';

describe('PokerOfflineService', () => {
  let service: PokerOfflineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokerOfflineService],
    }).compile();

    service = module.get<PokerOfflineService>(PokerOfflineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
