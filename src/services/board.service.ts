import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import dbService from '../lib/postgre.db';

class BoardService {

  public async boardlist(param: Array<number>): Promise<any> {
    const categoryList: Array<number> = [0,1,2,3,4]; // 0: 공지 / 1: 자유 / 2: 취미 / 3: 번개 / 4: 홍보
    if(categoryList.indexOf(param[0]) == -1) throw new HttpException(602, '없는 게시판입니다.');

    const sqlValue = param;
    const sql = `
      SELECT 
        board_id,
        board_title, 
        board_contents, 
        category, 
        write_dt, 
        modify_dt, 
        view_count, 
        like_count, 
        user_id 
      FROM ssu_forest.meerkat_board
      WHERE category = $1`;

    const db = new dbService();
    const queryData = await db.query(sql, sqlValue);

    return queryData;
  }

}

export default BoardService;
