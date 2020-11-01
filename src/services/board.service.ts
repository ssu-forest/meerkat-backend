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
        json_agg
        ( 
          json_build_object(
            'id',mb.board_id,
            'title' , mb.board_title,
            'contents', mb.board_contents ,
            'writeDt',mb.write_dt ,
            'modifyDt', mb.modify_dt ,
            'viewCount', mb.view_count ,
            'likeCount',mb.like_count ,
            'user', json_build_object(
              'id' , mm.user_id,
              'email', mm.user_email
            ) 
          )
        ) AS jsondata
      FROM ssu_forest.meerkat_board AS mb
      JOIN ssu_forest.meerkat_member AS mm
      ON mb.user_id = mm.user_id
      WHERE mb.category = $1`;

    const db = new dbService();
    const queryData = await db.query(sql, sqlValue);

    console.log(queryData.rows[0]);
    console.log(sqlValue);

    return queryData.rows[0];
  }

}

export default BoardService;
