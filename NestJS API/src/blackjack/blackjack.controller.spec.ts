import { Test, TestingModule } from '@nestjs/testing';
import { BlackjackController } from './blackjack.controller';

describe('BlackjackController', () => {
  let controller: BlackjackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlackjackController],
    }).compile();

    controller = module.get<BlackjackController>(BlackjackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
