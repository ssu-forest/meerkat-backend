import { Request } from 'express';
import { User } from './users.interface';

export interface DataStoredInToken {
  id: number;
  email: string;
  state?: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
