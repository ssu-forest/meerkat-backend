import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import dbService from '../lib/postgre.db';

class CommentService {


  public async commentWrite(param: Array<string>): Promise<any> {
    const sqlValue = param;

    console.log("sqlValue--------");
    console.log(sqlValue);

    const sql = `
      INSERT INTO ssu_forest.meerkat_comment (
        board_id, 
        user_id, 
        comment_contents, 
        write_dt, 
        modify_dt, 
        comment_parent_id
      )
      VALUES ($1, $2, $3, now(), now(), 0)`;
    const db = new dbService();
    const queryData = await db.query(sql, sqlValue);
    return queryData.rows[0];
  }
}

export default CommentService;
