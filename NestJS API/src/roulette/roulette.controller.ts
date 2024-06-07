import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { Roulette } from './interfaces/roulette.interface';
import { RouletteService } from './roulette.service';

@Controller('api/roulette')
export class RouletteController {
  constructor(private readonly rouletteService: RouletteService) {}
  @Post()
  async create(@Body() body) {
    for (const bet of body.rouletteBets) {
      if (bet.double) for (let i in bet.double) bet.double[i] = parseInt(bet.double[i])
      if (bet.cuadruple) for (let i in bet.cuadruple) bet.cuadruple[i] = parseInt(bet.cuadruple[i])
      if (bet.number) bet.number = parseInt(bet.number)
      console.log(bet)
    }
    return await this.rouletteService.createRoulette(
      body.userId,
      body.rouletteBets,
    );
  }
}
