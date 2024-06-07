import { Module } from '@nestjs/common';
import { StatsSchema } from './schemas/stats.schema';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Stats', schema: StatsSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
