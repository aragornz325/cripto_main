import { Test, TestingModule } from '@nestjs/testing';
import { PokerPlayersService } from './poker-players.service';

describe('PokerPlayersService', () => {
  let service: PokerPlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokerPlayersService],
    }).compile();

    service = module.get<PokerPlayersService>(PokerPlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
