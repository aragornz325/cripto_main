import { Test, TestingModule } from '@nestjs/testing';
import { PokerOfflineController } from './poker-offline.controller';

describe('PokerOfflineController', () => {
  let controller: PokerOfflineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokerOfflineController],
    }).compile();

    controller = module.get<PokerOfflineController>(PokerOfflineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
