import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { Stat } from './interfaces/stats.interface';
import { StatsService } from './stats.service';

@Controller('/stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async findAll(): Promise<Object> {
    return this.statsService.findAll();
  }

  @Post()
  async create(@Body() body): Promise<Stat> {
    const { userId, coins, game, description } = body;
    return this.statsService.create(userId, coins, game, description);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Object> {
    return this.statsService.delete(id);
  }

  @Delete()
  async deleteAll(): Promise<Object> {
    return this.statsService.deleteAll();
  }
}
