import { Request } from 'express';
import { User } from './users.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface JoinUser {
  id : string;
  password : string;
  email : string;
  name : string;
  nickName : string;
  sex : string;
  birth : number;
  serviceYn : string;
  smsYn : string;
  emailYn : string;
}
