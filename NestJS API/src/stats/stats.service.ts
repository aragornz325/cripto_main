import { Injectable } from '@nestjs/common';
import { Stat } from './interfaces/stats.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bet } from './interfaces/bet.interface';
import { coinToNumber } from './functions/coinToNumber.function';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel('Stats') private readonly stats: Model<Stat>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<Object> {
    const stats = await this.stats.find();

    const obj = {};

    for (const data of stats) {
      const date = new Date(data.date);
      const dayHour = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} - ${date.getHours()}`;
      const splittedUrl = data.route.split('/');
      obj[dayHour] = {
        ...obj[dayHour],
      };
      if (splittedUrl[1] === 'poker-holdem') {
        obj[dayHour] = {
          ...obj[dayHour],
          poker: obj[dayHour].poker ? obj[dayHour].poker + 1 : 1,
        };
      } else if (splittedUrl[2] === 'blackjack') {
        obj[dayHour] = {
          ...obj[dayHour],
          blackjack: obj[dayHour].blackjack ? obj[dayHour].blackjack + 1 : 1,
        };
      } else if (splittedUrl[2] === 'roulette') {
        obj[dayHour] = {
          ...obj[dayHour],
          roulette: obj[dayHour].roulette ? obj[dayHour].roulette + 1 : 1,
        };
      }
    }
    const labels = [];
    const poker = [];
    const blackjack = [];
    const roulette = [];

    for (const day in obj) {
      labels.push(day);
      poker.push(obj[day].poker ? obj[day].poker : 0);
      blackjack.push(obj[day].blackjack ? obj[day].blackjack : 0);
      roulette.push(obj[day].roulette ? obj[day].roulette : 0);
    }

    return { labels, poker, blackjack, roulette };
  }

  async create(
    userId: string,
    coins: Bet,
    game: string,
    description: string,
  ): Promise<Stat> {
    const winning: number = coinToNumber(coins);
    return await this.stats.create({ userId, winning, game, description });
  }

  async delete(id: string): Promise<Object> {
    return await this.stats.deleteOne({ _id: id });
  }

  async deleteAll(): Promise<Object> {
    return await this.stats.deleteMany({});
  }

  async register(route) {
    this.stats.create({ route, date: Date.now() });
  }
}
