import { Injectable, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // The following function should NOT return individual errors, but rather a generic error message like "User and password do not match".
  // If not, any hacker can exploit this functionality to know whether a user exists or not.
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user === null) {
      return { error: 'User does not exist' };
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return { error: 'Password is not correct' };
      }
      return user;
    }
  }

  async validateUserByEmail(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...rta } = user;
        return rta;
      }
    }
    return null;
  }

  async login(user: any) {
    if (user.error) {
      return user;
    } else {
      const payload = { userId: user._id, sub: user._id.toString() };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }

  async getUserData(access_token: string): Promise<any> {
    if (!access_token) {
      return { error: 'User not logged in' };
    } else {
      // @ts-ignore
      const { userId } = this.jwtService.decode(access_token);
      return await this.usersService.findOne(userId);
    }
  }
}
