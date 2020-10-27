import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import DbService from '../lib/postgre.db';

class UrlService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = this.users;
    return users;
  }

  public async findUserId(param: Array<string>): Promise<any> {
    const sqlValue = param;
    const sql = `
      SELECT 
        id 
      FROM ssu_forest.meerkat_member 
      WHERE user_id = $1`;

    const db = new DbService();
    let queryData = await db.query(sql, sqlValue); 
    return queryData;
  }

  public async findUserEmail(param: Array<string>): Promise<any> {
    const sqlValue = param;
    const sql = `
      SELECT 
        user_id 
      FROM ssu_forest.meerkat_member 
      WHERE user_email = $1`;

    const db = new DbService();
    let queryData = await db.query(sql, sqlValue); 
    return queryData;
  }


  public async findUserNickName(param: Array<string>): Promise<any> {
    const sqlValue = param;
    const sql = `
      SELECT 
        user_id 
      FROM USER 
      WHERE nick_name = $1`;
    const db = new DbService();
    let queryData = await db.query(sql, sqlValue); 
    return queryData;
  }


  public async joinUser(param: Array<string>): Promise<any> {
    const sqlValue = param;
    const sql = `
      INSERT INTO ssu_forest.meerkat_member (
        user_email, 
        join_dt, 
        user_pw, 
        user_state, 
        user_nm
      )VALUES($1 , now() , $2 , '01' , '')
      RETURNING user_id AS id , user_email AS email, user_state AS state
      `;
    const db = new DbService();
    let queryData = await db.query(sql, sqlValue);
    return queryData;
  }
}

export default UrlService;
