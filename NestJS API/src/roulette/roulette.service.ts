import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatsService } from 'src/stats/stats.service';
import { User } from 'src/users/interfaces/user.interface';
import { rouletteNumbers } from './classes/roulette.number.class';
import { checkOut } from './functions/checkout';
import { verifyBet } from './functions/get_total_bet';
import { RouletteBet } from './interfaces/roulette.bet.interface';

@Injectable()
export class RouletteService {
  constructor(
    private readonly statsService: StatsService,
    @InjectModel('User') private readonly users: Model<User>,
  ) {}
  async createRoulette(
    userId: string,
    rouletteBets: RouletteBet[],
  ): Promise<any> {
    const user = await this.users.findOne({ _id: userId });
    const number = Math.random() * 360;
    const slice = number / 9.72;
    let sliceNumber = Math.floor(slice);
    while (sliceNumber > 36) {
      sliceNumber = sliceNumber - 36;
    }
    const rouletteNumber = rouletteNumbers[sliceNumber];
    const totalBets = verifyBet(rouletteBets, user);
    if (!totalBets) throw new ForbiddenException('Not enough balance for this bet')
    user.balance -= totalBets;
    const { newBets, wonAmount } = await checkOut(
      user,
      rouletteNumber,
      rouletteBets,
    );
    await user.save();
    const totalRotation = rouletteNumber.number * 9.72 + 360 * randomIntFromInterval(5, 13);
    return {
      coins: user.coins,
      bets: rouletteBets,
      newBets,
      status: true,
      rotation: totalRotation,
      rouletteNumber: rouletteNumber,
      wonAmount,
    };
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
