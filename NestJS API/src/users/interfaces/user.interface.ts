export interface User {
  id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status?: boolean;
  date: Date;
  coins?: {
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
  balance?: number;
}
