import { Test, TestingModule } from '@nestjs/testing';
import { PokerActionsService } from './poker-actions.service';

describe('PokerActionsService', () => {
  let service: PokerActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokerActionsService],
    }).compile();

    service = module.get<PokerActionsService>(PokerActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
