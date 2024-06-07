import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StatsModule } from 'src/stats/stats.module';
import { RoomController } from './controllers/room/room.controller';

import { PokerRoomsService } from './services/poker-rooms/poker-rooms.service';
import { PokerGameService } from './services/poker-game/poker-game.service';
import { PokerPlayersService } from './services/poker-players/poker-players.service';
import { PokerActionsService } from './services/poker-actions/poker-actions.service';

import { User, UserSchema } from 'src/users/schemas/user.schema';
import { PokerRoom, PokerRoomSchema } from './schemas/poker-room.schema';
import { PokerRound, PokerRoundSchema } from './schemas/poker-round.schema';
import { PokerPlayer, PokerPlayerSchema } from './schemas/poker-player.schema';
import { BetAction, BetActionSchema } from './schemas/bet-action.schema';
import { BetState, BetStateSchema } from './schemas/bet-state.schema';
import { RoundState, RoundStateSchema } from './schemas/round-state.schema';
import { PokerHoldemGateway } from './adapters/poker-holdem.gateway';
import { GameController } from './controllers/game/game.controller';
import { RoomState, RoomStateSchema } from './schemas/room-state.schema';

@Module({
  imports: [
    StatsModule,

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: PokerRoom.name, schema: PokerRoomSchema },
    ]),
    MongooseModule.forFeature([
      { name: PokerRound.name, schema: PokerRoundSchema },
    ]),
    MongooseModule.forFeature([
      { name: PokerPlayer.name, schema: PokerPlayerSchema },
    ]),

    MongooseModule.forFeature([
      { name: BetAction.name, schema: BetActionSchema },
    ]),
    MongooseModule.forFeature([
      { name: BetState.name, schema: BetStateSchema },
    ]),
    MongooseModule.forFeature([
      { name: RoomState.name, schema: RoomStateSchema },
    ]),
    MongooseModule.forFeature([
      { name: RoundState.name, schema: RoundStateSchema },
    ]),
  ],
  providers: [
    PokerHoldemGateway,
    PokerRoomsService,
    PokerGameService,
    PokerPlayersService,
    PokerActionsService,
  ],
  controllers: [RoomController, GameController],
  exports: [
    PokerRoomsService,
    PokerGameService,
    PokerPlayersService,
    PokerActionsService,
  ],
})
export class PokerHoldemModule {}
