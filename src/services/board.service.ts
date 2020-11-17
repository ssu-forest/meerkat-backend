import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import dbService from '../lib/postgre.db';

class BoardService {

  public async boardList(param: Array<string>): Promise<any> {
    const categoryList: Array<string> = ['free','notice']; // 0: 공지 / 1: 자유 / 2: 취미 / 3: 번개 / 4: 홍보
    if(categoryList.indexOf(param[0]) == -1) throw new HttpException(602, '없는 게시판입니다.');

    const sqlValue = param;
    const sql = `
    WITH board_view AS (
      SELECT 
        JSON_BUILD_OBJECT(
          'id',mb.board_id,
          'title' , mb.board_title,
          'contents', mb.board_contents ,
          'userId', mb.user_id,
          'writeDt', TO_CHAR(mb.write_dt , 'YYYY.MM.DD,HH24:MI:SS') ,
          'modifyDt', TO_CHAR(mb.modify_dt , 'YYYY.MM.DD,HH24:MI:SS') ,
          'viewCount', mb.view_count ,
          'likeCount',mb.like_count ,
          'comment', array_agg(
            JSON_BUILD_OBJECT(
              'id', mc.comment_id,
              'contents', mc.comment_contents, 
              'userId', mc.user_id
            )
          )
        ) AS list
      FROM ssu_forest.meerkat_board AS mb
      JOIN ssu_forest.meerkat_member AS mm
      ON mb.user_id = mm.user_id
      LEFT JOIN ssu_forest.meerkat_comment AS mc
      ON mb.board_id = mc.board_id
      WHERE mb.category = $1
      AND board_state = '01'
      GROUP BY mb.board_id
    )
    SELECT 	
      JSON_AGG ( 
        list
      ) AS jsondata
    FROM board_view`;

    const db = new dbService();
    const queryData = await db.query(sql, sqlValue);

    return queryData.rows[0];
  }

  public async boardWrite(param: Array<string>): Promise<any> {
    const sqlValue = param;
    const sql = `
      INSERT INTO ssu_forest.meerkat_board (
        board_title, 
        board_contents, 
        category, 
        write_dt, 
        modify_dt, 
        view_count, 
        like_count, 
        user_id
      )
      VALUES ($1, $2, $3, now(), now(), 0, 0, $4)
      RETURNING 
        board_title, 
        board_contents, 
        category, 
        TO_CHAR(write_dt , 'YYYY.MM.DD,HH24:MI:SS') AS write_dt, 
        TO_CHAR(modify_dt , 'YYYY.MM.DD,HH24:MI:SS') AS modify_dt, 
        view_count, 
        like_count , 
        user_id 
      `;
    const db = new dbService();
    const queryData = await db.query(sql, sqlValue);
    return queryData.rows[0];
  }

  public async boardModify(param: Array<string>): Promise<any> {
    const sqlValue = param;
    const sql = `
      UPDATE ssu_forest.meerkat_board SET 
        board_title = $3,
        board_contents = $4,
        modify_dt = now()
      WHERE user_id = $1
      AND board_id = $2
      AND board_state = '01'
      RETURNING board_title, board_contents, category, TO_CHAR(write_dt , 'YYYY.MM.DD,HH24:MI:SS') AS write_dt, TO_CHAR(modify_dt , 'YYYY.MM.DD,HH24:MI:SS') AS modify_dt, view_count , like_count , user_id 
    `;
    const db = new dbService();

    const queryData = await db.query(sql, sqlValue);
    if(queryData.rowCount == 0) throw new HttpException(601, '수정 할 수 없는 게시글입니다.');
    return queryData.rows[0];    
  }

  public async boardDelete(param: Array<string>): Promise<any> {
    const sqlValue = param;
    const sql = `
      UPDATE ssu_forest.meerkat_board SET board_state = '02'
      WHERE user_id = $1
      AND board_id = $2
      AND board_state = '01'
      RETURNING board_id
    `;
    const db = new dbService();
    const queryData = await db.query(sql, sqlValue);

    if(queryData.rowCount == 0) throw new HttpException(601, '삭제 할 수 없는 게시글입니다.');
    return queryData.rows[0];
  }


  public async boardLike(param: Array<string>): Promise<any> {
    const sqlValue: any = param;
    const sql = `
      SELECT user_id FROM ssu_forest.meerkat_board_like
      WHERE board_id = $1
      AND user_id = $2
    `;
    const db = new dbService();
    const queryData = await db.query(sql, sqlValue);

    if(queryData.rowCount == 0){
      const sql2 = `
        INSERT INTO ssu_forest.meerkat_board_like(board_id, user_id, write_dt)
        VALUES ($1 , $2 , $3, now())`;
      const queryData2 = await db.query(sql2, sqlValue);
    }else{
      const sql2 = `
        DELETE ssu_forest.meerkat_board_like 
        WHERE board_id = $1
        AND user_id = $2`;

      const queryData2 = await db.query(sql2, sqlValue);
    }

    


    
    return queryData.rows[0];
  }




}

export default BoardService;
