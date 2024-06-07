import { Inject, Injectable, NestMiddleware, Session } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import { StatsService } from './stats.service';

@Injectable()
export class StatsMiddleware implements NestMiddleware {
  constructor(@Inject(StatsService) private statsService: StatsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.statsService.register(req.baseUrl);

    next();
  }
}
