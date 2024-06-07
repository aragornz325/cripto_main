import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsModule } from 'src/stats/stats.module';
import { UserSchema } from 'src/users/schemas/user.schema';
import { PokerOfflineController } from './poker-offline.controller';
import { PokerOfflineService } from './poker-offline.service';
import { PokerOfflineSchema } from './schemas/poker_offline.schema';

@Module({
  imports: [
    StatsModule,
    MongooseModule.forFeature([
      { name: 'PokerOffline', schema: PokerOfflineSchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [PokerOfflineController],
  providers: [PokerOfflineService],
  exports: [PokerOfflineService],
})
export class PokerOfflineModule {}
