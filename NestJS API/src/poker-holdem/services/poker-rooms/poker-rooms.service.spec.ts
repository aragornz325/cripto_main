import { Test, TestingModule } from '@nestjs/testing';
import { PokerRoomsService } from './poker-rooms.service';

describe('PokerRoomsService', () => {
  let service: PokerRoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokerRoomsService],
    }).compile();

    service = module.get<PokerRoomsService>(PokerRoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
