import { Test, TestingModule } from '@nestjs/testing';
import { PokerGameService } from './poker-game.service';

describe('PokerGameService', () => {
  let service: PokerGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokerGameService],
    }).compile();

    service = module.get<PokerGameService>(PokerGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
