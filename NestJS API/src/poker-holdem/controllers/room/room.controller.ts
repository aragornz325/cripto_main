import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PokerRoomsService } from 'src/poker-holdem/services/poker-rooms/poker-rooms.service';
import { CreateRoomDto } from 'src/poker-holdem/dto/create-room.dto';
import { JoinRoomDto } from 'src/poker-holdem/dto/join-room.dto';
import { LeaveRoomDto } from 'src/poker-holdem/dto/leave-room.dto';

@Injectable()
@Controller('room')
export class RoomController {
  constructor(
    @Inject(PokerRoomsService) private pokerRoomService: PokerRoomsService,
  ) {}

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    const { roomId, error } = await this.pokerRoomService.createRoom(
      createRoomDto,
    );
    if (error) throw error;
    return { roomId };
  }

  @Get('all')
  async listRooms() {
    const { rooms, error } = await this.pokerRoomService.listRooms();
    if (error) throw error;
    if (!rooms) throw new NotFoundException();
    return rooms;
  }

  @Get(':roomId')
  async getRoom(@Param() params: { roomId: string }) {
    const { room, error } = await this.pokerRoomService.getRoom(params.roomId);
    if (error) throw error;
    if (!room) throw new NotFoundException();
    return room;
  }

  @Delete(':roomId')
  async deleteRoom(@Param() params: { roomId: string }) {
    const result = await this.pokerRoomService.deleteRoom(params.roomId);
    return result;
  }

  @Put('join')
  async joinRoom(@Body() joinRoomDto: JoinRoomDto) {
    const result = await this.pokerRoomService.joinRoom(joinRoomDto);
    if (result.error) throw result.error;
    const room = await this.pokerRoomService.getRoom(joinRoomDto.roomId);
    if (room.error) throw room.error;
    return room.room;
  }

  @Put('leave')
  async leaveRoom(@Body() { roomId, pokerPlayerId }: LeaveRoomDto) {
    const result = await this.pokerRoomService.leaveRoom(roomId, pokerPlayerId);
    if (result.error) throw result.error;
    return result;
  }
}
