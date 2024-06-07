import { Test, TestingModule } from '@nestjs/testing';
import { BlackjackService } from './blackjack.service';

describe('BlackjackService', () => {
  let service: BlackjackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlackjackService],
    }).compile();

    service = module.get<BlackjackService>(BlackjackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
