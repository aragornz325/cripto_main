import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { RouterModule } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { UsersModule } from './users/users.module';
import { BlackjackController } from './blackjack/blackjack.controller';
import { BlackjackModule } from './blackjack/blackjack.module';
import { AuthModule } from './auth/auth.module';
import { RouletteModule } from './roulette/roulette.module';
import { AppController } from './app.controller';
import { RouletteController } from './roulette/roulette.controller';
import { PokerOfflineModule } from './poker-offline/poker-offline.module';
import { PokerOfflineController } from './poker-offline/poker-offline.controller';
import { StatsController } from './stats/stats.controller';
import { StatsModule } from './stats/stats.module';
import { FeedbackController } from './feedback/feedback.controller';
import { FeedbackModule } from './feedback/feedback.module';
import { PokerHoldemModule } from './poker-holdem/poker-holdem.module';
import { OrdersModule } from './orders/orders.module';
import { StatsMiddleware } from './stats/stats.middleware';
import { TransactionsModule } from './transactions/transactions.module';
import { ValidateJwtMiddleware } from './commons/validate-jwt.middleware';

import config from './config/keys';
import { environments } from './enviroments';
import configEnv from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [configEnv],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
      }),
    }),
    UsersModule,
    MongooseModule.forRoot(config.mongoURI),
    BlackjackModule,
    RouletteModule,
    PokerOfflineModule,
    AuthModule,
    StatsModule,
    FeedbackModule,
    OrdersModule,
    PokerHoldemModule,
    RouterModule.register([
      {
        path: 'poker-holdem',
        module: PokerHoldemModule,
      },
    ]),

    TransactionsModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    AppController,
    UsersController,
    BlackjackController,
    RouletteController,
    PokerOfflineController,
    StatsController,
    FeedbackController,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateJwtMiddleware)
      .exclude(
        { path: 'api/users', method: RequestMethod.POST },
        { path: 'api/auth/login', method: RequestMethod.POST },
        { path: 'api/auth/user', method: RequestMethod.POST },
      )
      .forRoutes('*');
    consumer.apply(StatsMiddleware).forRoutes('*');
  }
}
