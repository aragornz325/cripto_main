import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PokerRoomsService } from '../services/poker-rooms/poker-rooms.service';
import { JoinRoomDto } from '../dto/join-room.dto';
import { PokerGameService } from '../services/poker-game/poker-game.service';
import { PokerActionsService } from '../services/poker-actions/poker-actions.service';
import { BetDto } from '../dto/bet.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
@WebSocketGateway({
  namespace: 'poker-holdem',
  cors: {
    origin: [
      'https://cryptgo.co',
      'https://api.cryptgo.co',
      'https://apicasino.herokuapp.com',
      'http://localhost:3000',
      'http://localhost:40105',
      'https://casinocrypto.netlify.app',
    ],
    credentials: true,
  },
})
export class PokerHoldemGateway {
  constructor(
    @Inject(PokerRoomsService) private pokerRoomsService: PokerRoomsService,
    @Inject(forwardRef(() => PokerGameService))
    private pokerGameService: PokerGameService,
    @Inject(PokerActionsService)
    private pokerActionService: PokerActionsService,
    private eventEmitter: EventEmitter2,
  ) {}

  private readonly logger = new Logger(PokerHoldemGateway.name);

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connection')
  handleConnection(@ConnectedSocket() socket: Socket) {
    socket.on('disconnect', (reason: string) => {});
  }

  @SubscribeMessage('see-room')
  async seeRoom(
    @MessageBody() { roomId, playerId }: { roomId: string; playerId?: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(roomId);
    if (playerId) client.data.playerId = playerId;
    this.eventEmitter.emit('refresh-room', roomId);
  }

  @SubscribeMessage('join')
  async joinRoom(
    @MessageBody() joinRoomDto: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    const result = await this.pokerRoomsService.joinRoom(joinRoomDto);
    if (result.error) throw new WsException(result.error.message);

    client.data.playerId = result.playerId.toString();
    this.eventEmitter.emit('refresh-room', joinRoomDto.roomId);
  }

  @SubscribeMessage('bet')
  async bet(
    @MessageBody() { roomId, playerId, betAction, raiseAmount }: BetDto,
    @ConnectedSocket() client: Socket,
  ) {
    const result = await this.pokerActionService.bet(
      roomId,
      playerId,
      betAction,
      raiseAmount,
    );
    if (result.error) throw new WsException(result.error.message);
  }

  @SubscribeMessage('leave')
  async leave(
    @MessageBody() { roomId, playerId },
    @ConnectedSocket() client: Socket,
  ) {
    const result = await  this.pokerRoomsService.leaveRoom(roomId, playerId)
    this.eventEmitter.emit('refresh-room', roomId);
  }

  @OnEvent('refresh-room')
  async refresh(roomId: string) {
    const { error, room, cards } = await this.pokerRoomsService.getRoom(roomId);
    if (error) throw new WsException(error.message);

    const sockets = await this.server.in(roomId).fetchSockets();
    const players: any = {};

    // Maps players into object with ids as keys, so don't need find every time a socket has playerId
    if (room.activeRound) {
      for (const player of room.activeRound.players) {
        players[player._id.toString()] = player;
      }
    }

    if (!room.activeRound || room.activeRound?.roundState === 5) {
      this.server.to(roomId).emit('refresh', room);
    } else {
      for (const socket of sockets) {
        // If is a player's socket and player has cards (maybe is a player waiting for a new round)
        if (socket.data.playerId && cards[socket.data.playerId]) {
          players[socket.data.playerId].hand = cards[socket.data.playerId];
          this.server.to(socket.id).emit('refresh', room);
          players[socket.data.playerId].hand = [];
        } else {
          this.server.to(socket.id).emit('refresh', room);
        }
      }
    }
  }
}
