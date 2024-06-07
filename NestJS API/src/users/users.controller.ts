import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateCoinsDto } from './dto/update-bjcoins.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

const bcrypt = require('bcrypt');

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('balances')
  async getBalances() {
    return this.usersService.getBalances();
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = encryptedPassword;
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Put('addCoins/:id')
  async addCoins(@Param('id') id: string, @Body() body) {
    return this.usersService.addCoins(id, Number(body.coins));
  }

  @Put('updateCoins/:id')
  async updateCoins(
    @Param('id') id: string,
    @Body() updateBJCoinsDto: UpdateCoinsDto,
  ) {
    return this.usersService.updateCoins(id, updateBJCoinsDto);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }
}
