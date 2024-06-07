export class CreateUserDto {
  readonly username: string;
  password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly status: boolean;
  readonly date: Date;
  readonly coins: {
    one: number;
    five: number;
    ten: number;
    twentyfive: number;
    fifty: number;
    hundred: number;
    twohundred: number;
    fivehundred: number;
    thousand: number;
  };
  readonly balance: number;
}

export class UpdateUserDto {
  readonly username: string;
  password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly status: boolean;
  readonly date: Date;
}
