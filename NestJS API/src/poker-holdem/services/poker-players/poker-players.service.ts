import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StatsService } from 'src/stats/stats.service';
import { User } from 'src/users/interfaces/user.interface';
import { PokerRoomDocument } from 'src/poker-holdem/schemas/poker-room.schema';

@Injectable()
export class PokerPlayersService {
  constructor(
    private readonly statsService: StatsService,
    @InjectModel('PokerRoom') private roomsModel: Model<PokerRoomDocument>,
    @InjectModel('User') private readonly users: Model<User>,
  ) {}

  async playerDisconnected(roomId: string, playerId: string): Promise<any> {
    return await this.roomsModel
      .findById(new Types.ObjectId(roomId))
      .then((room) => {
        // console.log(` ===>>> Player ${playerId} disconnected.`)
        // if (room) {
        // 	let player = room.players.find(p => p.id == playerId);
        // 	if (player) {
        // 		player.connected = false;
        // 		return player;
        // 	}
        // 	else return { error: "Player not found" };
        // }
        // else return { error: "Room not found: " + roomId };
      })
      .catch((err) => {
        return { error: 'Error when handling disconnected player' };
      });
  }

  async reconnectPlayer(roomId: any, id: string, userId: any): Promise<any> {
    return await this.roomsModel
      .findById(new Types.ObjectId(roomId))
      .then((room) => {
        // if (!room) return { error: "Room not found" };
        // console.log(`    >>> Reconnecting player ${id} to room ${roomId}`)
        // let player = room.players.find((player:Player) => { return player.id == id || player.userId == userId });
        // if (!player) {
        // 	console.log(`    >>> Reconnection failed, player not found.`)
        // 	return { error: "Player not found" }
        // }
        // else {
        // 	// player.id = id;
        // 	// player.connected = true;
        // 	// room.markModified('players');
        // 	// room.save();
        // 	// let turn = undefined;
        // 	// let p = (room.players as Player[]).find(player => player.turn);
        // 	// if(p) turn = p.userId;
        // 	// return {
        // 	// 	minBet: ( (room.currentBet || roundBet(room)) + roundRaiseValue(room) ),
        // 	// 	deckHand: room.deckHand,
        // 	// 	hand: player.hand,
        // 	// 	turn
        // 	// };
        // }
      })
      .catch((e) => {
        return { error: "Couldn't reconnect: " + e };
      });
  }
}
