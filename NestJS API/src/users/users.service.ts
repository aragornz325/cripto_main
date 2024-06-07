import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Coins } from './interfaces/bjcoins.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './schemas/user.schema';
import { NotFoundError } from 'rxjs';

const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly users: Model<User>,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.users.find({}, { password: 0 });
  }

  async findOne(id: string): Promise<User> {
    return await this.users.findOne({ _id: id }, { password: 0 });
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.users.findOne({ username });
    if (!user) throw new NotFoundException('No user with this username')
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const userDb = await this.users.findOne({ email });
    if (!userDb) throw new NotFoundException('No user with this email')
    return userDb;
  }

  async create(user: User): Promise<any> {
    const existemail = await this.userModel.findOne({ email: user.email })
    console.log(existemail)
    if (existemail) throw new ConflictException('Email already exists')
    return await this.users
      .findOne({ username: user.username }, { password: 0 })
      .then(async (result) => {
        if (result) {
          throw new ConflictException( 'Username already exists') ;
        } else {
          return await this.users.create(user);
        }
      });
  }

  async delete(id: string): Promise<User> {
    return await this.users.findByIdAndRemove(id);
  }

  async update(id: string, user: User): Promise<User> {
    return await this.users.findByIdAndUpdate(id, user, { new: true });
  }

  async updateCoins(id: string, bjCoins: Coins): Promise<User> {
    return await this.users.findByIdAndUpdate(
      id,
      { coins: bjCoins },
      { new: true },
    );
  }

  async deleteCoins(id: string): Promise<User> {
    return await this.users.findByIdAndUpdate(
      id,
      { coins: null },
      { new: true },
    );
  }

  async getBalances(): Promise<any> {
    const users = await this.users.find();
    const balances = await users.map((user) => {
      let balance = 0;
      Object.keys(user.coins).map((key) => {
        switch (key) {
          case 'one':
            balance += user.coins[key] * 1;
            break;
          case 'five':
            balance += user.coins[key] * 5;
            break;
          case 'ten':
            balance += user.coins[key] * 10;
            break;
          case 'twentyfive':
            balance += user.coins[key] * 25;
            break;
          case 'fifty':
            balance += user.coins[key] * 50;
            break;
          case 'hundred':
            balance += user.coins[key] * 100;
            break;
          case 'twohundred':
            balance += user.coins[key] * 200;
            break;
          case 'fivehundred':
            balance += user.coins[key] * 500;
            break;
          case 'thousand':
            balance += user.coins[key] * 1000;
            break;
        }
        return;
      });
      return [user.username, balance];
    });
    return balances;
  }

  async addCoins(id, coins: number): Promise<any> {
    const newUser = await this.users.findById(id);
    newUser.balance += coins;
    newUser.markModified('balance');
    await newUser.save();
    return newUser;
  }
}
